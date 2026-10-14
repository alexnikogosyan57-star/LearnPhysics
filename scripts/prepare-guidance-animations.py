"""Matte six supplied clips, trim greetings/holds, strip every audio track.
One-time tooling matches prepare-greeting-animation.py; runtime uses local assets.
Original robot pixels are preserved. Clip bounds are selected from contact sheets.
"""
from pathlib import Path
import subprocess
import sys
import numpy as np
import cv2
from PIL import Image
from scipy import ndimage
from rembg import new_session
import onnxruntime as ort

root=Path(__file__).resolve().parents[1]/'src/assets'
w,h,fps=432,768,24
options=ort.SessionOptions();options.intra_op_num_threads=2;options.inter_op_num_threads=1
session=new_session('u2net',sess_opts=options,providers=['CPUExecutionProvider'])
# Remove standing introductions, the right-pointing greeting and trailing returns.
clips=[('point-left',.75,2.25,True),('point-right',1.0,2.5,False),
       ('success-answer',1.05,2.125,False),('success-complete',.75,2.75,True),
       ('idle-primary',.75,2.75,False),('idle-secondary',.75,2.75,True),
       ('eureka',1.75,2.0,False),('confused',.75,2.5,False)]
for name,start,length,checker in clips:
    if len(sys.argv)>1 and name not in sys.argv[1:]:continue
    reader=subprocess.Popen(['ffmpeg','-v','error','-ss',str(start),'-i',str(root/f'{name}.mp4'),'-t',str(length),'-vf',f'scale={w}:{h}','-f','rawvideo','-pix_fmt','rgb24','pipe:1'],stdout=subprocess.PIPE)
    writer=subprocess.Popen(['ffmpeg','-y','-v','error','-f','rawvideo','-pix_fmt','rgba','-s',f'{w}x{h}','-r',str(fps),'-i','pipe:0','-an','-c:v','libvpx-vp9','-pix_fmt','yuva420p','-auto-alt-ref','0','-b:v','0','-crf','25','-cpu-used','4','-row-mt','1',str(root/f'{name}-transparent.webm')],stdin=subprocess.PIPE)
    frames=0;first=last=None
    while True:
        raw=reader.stdout.read(w*h*3)
        if not raw:break
        if len(raw)!=w*h*3:raise RuntimeError('Incomplete source frame')
        rgb=np.frombuffer(raw,np.uint8).reshape(h,w,3)
        mask=np.asarray(session.predict(Image.fromarray(rgb))[0]).astype(np.float32)/255
        alpha=np.clip((mask-.25)/.65,0,1)
        # Semantic matte handles both white and baked checkerboard backgrounds.
        # Repair only small gaps in the ivory forehead; preserve finger openings.
        closed=cv2.morphologyEx((alpha>.6).astype(np.uint8),cv2.MORPH_CLOSE,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(25,25)))
        repair=ndimage.gaussian_filter(closed.astype(np.float32),.5)
        alpha[95:245,65:405]=np.maximum(alpha[95:245,65:405],repair[95:245,65:405])
        if name == 'eureka':
            # Retain the real golden light bulb/rays, which are separate from the body.
            colors=rgb.astype(np.int16)
            golden=(colors[:,:,0]>180)&(colors[:,:,1]>130)&(colors[:,:,1]-colors[:,:,2]>30)
            golden[280:]=False
            alpha=np.maximum(alpha,ndimage.gaussian_filter(golden.astype(np.float32),.45))
        alpha=np.clip(alpha*255+.5,0,255).astype(np.uint8);alpha[alpha<3]=0
        rgba=np.dstack([rgb,alpha]);rgba[alpha==0,:3]=0
        if alpha[0,0]!=0:raise RuntimeError('Opaque background')
        writer.stdin.write(rgba.tobytes())
        if first is None:first=rgba.copy()
        last=rgba.copy();frames+=1
        if frames%24==0:print(f'{name}: {frames} frames',flush=True)
    writer.stdin.close()
    if writer.wait()!=0 or reader.wait()!=0 or frames!=round(length*fps):raise RuntimeError(f'{name}: incomplete ({frames})')
    for suffix,frame in [('poster',first),('idle',last)]:
        Image.fromarray(frame).save(root/f'{name}-transparent-{suffix}.png')
    subprocess.run(['ffmpeg','-y','-v','error','-c:v','libvpx-vp9','-i',str(root/f'{name}-transparent.webm'),'-vf','scale=216:384','-c:v','libwebp_anim','-q:v','78','-compression_level','4','-loop','1',str(root/f'{name}-transparent-animated.webp')],check=True)
    print(f'{name}: complete, {frames/fps:.2f}s, no audio',flush=True)
