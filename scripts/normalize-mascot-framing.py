"""Uniformly reframe actual alpha footage around a common body height and floor.
Run LAST after source matting / loop generation. Never stretch the robot.
Face-based head location excludes antennas, Eureka's bulb and raised hands.
One constant affine transform per clip preserves the recorded motion.
"""
from pathlib import Path
import subprocess,json,sys
import numpy as np
import cv2
from scipy import ndimage
from PIL import Image
root=Path(__file__).resolve().parents[1]/'src/assets'
w,h=432,768
names=['greeting','thinking','point-left','point-right','success-answer','success-complete','idle-primary','idle-secondary','eureka','confused','celebration']
metadata=json.loads((root/'mascot-framing.json').read_text()) if (root/'mascot-framing.json').exists() else {}
def anchors(frame):
    a=frame[:,:,3]>100;rgb=frame[:,:,:3]
    dark=(rgb.max(2)<115)&a
    dark[int(h*.57):]=False
    labels,_=ndimage.label(dark);sizes=np.bincount(labels.ravel());sizes[0]=0
    face=labels==sizes.argmax();ys,xs=np.where(face)
    assert len(xs)>400,'Missing face anchor'
    face_width=np.percentile(xs,99.5)-np.percentile(xs,.5)
    head_top=np.percentile(ys,.5)-face_width*.18
    y,x=np.where(a & (np.indices(a.shape)[0]>h*.6))
    floor=np.percentile(y,99.9)
    foot_x=np.median(x[y>floor-30])
    return head_top,floor,foot_x
for name in names:
    if len(sys.argv)>1 and name not in sys.argv[1:]:continue
    source=root/f'{name}-transparent.webm'
    raw=subprocess.run(['ffmpeg','-v','error','-c:v','libvpx-vp9','-i',str(source),'-f','rawvideo','-pix_fmt','rgba','pipe:1'],stdout=subprocess.PIPE,check=True).stdout
    frames=np.frombuffer(raw,np.uint8).reshape(-1,h,w,4)
    samples=[anchors(frame) for frame in frames[::max(1,len(frames)//8)]]
    top,floor,cx=np.median(samples,axis=0)
    scale=500/(floor-top)
    matrix=np.array([[scale,0,216-scale*cx],[0,scale,720-scale*floor]],np.float32)
    temporary=root/f'{name}-framed.webm'
    writer=subprocess.Popen(['ffmpeg','-y','-v','error','-f','rawvideo','-pix_fmt','rgba','-s',f'{w}x{h}','-r','24','-i','pipe:0','-an','-c:v','libvpx-vp9','-pix_fmt','yuva420p','-auto-alt-ref','0','-b:v','0','-crf','24','-cpu-used','4','-row-mt','1',str(temporary)],stdin=subprocess.PIPE)
    first=last=None
    for frame in frames:
        f=frame.astype(np.float32)/255;f[:,:,:3]*=f[:,:,3:4]
        out=cv2.warpAffine(f,matrix,(w,h),flags=cv2.INTER_LINEAR,borderMode=cv2.BORDER_CONSTANT,borderValue=0)
        out[:,:,:3]=np.divide(out[:,:,:3],out[:,:,3:4],out=np.zeros_like(out[:,:,:3]),where=out[:,:,3:4]>0)
        rgba=np.clip(out*255+.5,0,255).astype(np.uint8)
        writer.stdin.write(rgba.tobytes())
        if first is None:first=rgba.copy()
        last=rgba.copy()
    writer.stdin.close()
    if writer.wait()!=0:raise RuntimeError('Encoding failed')
    temporary.replace(source)
    Image.fromarray(first).save(root/f'{name}-transparent-poster.png')
    Image.fromarray(last).save(root/f'{name}-transparent-idle.png')
    fallback=root/f'{name}-transparent-animated.webp'
    if fallback.exists():
        loop='0' if name in ['idle-primary','idle-secondary','thinking'] else '1'
        subprocess.run(['ffmpeg','-y','-v','error','-c:v','libvpx-vp9','-i',str(source),'-vf','scale=216:384','-c:v','libwebp_anim','-q:v','80','-loop',loop,str(fallback)],check=True)
    metadata[name]={'scale':round(float(scale),6),'floor':720,'bodyHeight':500,'center':216,'matrix':matrix.tolist()}
    print(f'{name}: constant scale {scale:.3f}; body 500px, floor 720px, center 216px',flush=True)
(root/'mascot-framing.json').write_text(json.dumps(metadata,indent=2)+'\n')
