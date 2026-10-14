"""Ease genuine adjacent frames into six-second alpha idle loops.
Run prepare-guidance-animations.py idle-primary idle-secondary first.
No unrelated pose interpolation; premultiplied alpha prevents edge halos.
"""
from pathlib import Path
import subprocess
import numpy as np
from PIL import Image
root=Path(__file__).resolve().parents[1]/'src/assets'
w,h,fps,count=432,768,24,144
for name in ['idle-primary','idle-secondary']:
    target=root/f'{name}-transparent.webm'
    raw=subprocess.run(['ffmpeg','-v','error','-c:v','libvpx-vp9','-i',str(target),'-f','rawvideo','-pix_fmt','rgba','pipe:1'],stdout=subprocess.PIPE,check=True).stdout
    frames=np.frombuffer(raw,np.uint8).reshape(-1,h,w,4)
    writer=subprocess.Popen(['ffmpeg','-y','-v','error','-f','rawvideo','-pix_fmt','rgba','-s',f'{w}x{h}','-r',str(fps),'-i','pipe:0','-an','-c:v','libvpx-vp9','-pix_fmt','yuva420p','-auto-alt-ref','0','-b:v','0','-crf','25','-cpu-used','4','-row-mt','1',str(root/f'{name}-loop.webm')],stdin=subprocess.PIPE)
    first=last=None;changes=[]
    for index in range(count):
        position=(len(frames)-1)*(1-np.cos(2*np.pi*index/count))/2
        lo=int(position);hi=min(lo+1,len(frames)-1);weight=position-lo
        a=frames[lo].astype(np.float32)/255;b=frames[hi].astype(np.float32)/255
        alpha=a[:,:,3:4]*(1-weight)+b[:,:,3:4]*weight
        premult=a[:,:,:3]*a[:,:,3:4]*(1-weight)+b[:,:,:3]*b[:,:,3:4]*weight
        rgb=np.divide(premult,alpha,out=np.zeros_like(premult),where=alpha>0)
        rgba=np.clip(np.concatenate([rgb,alpha],2)*255+.5,0,255).astype(np.uint8)
        writer.stdin.write(rgba.tobytes())
        if first is None:first=rgba.copy()
        if last is not None:changes.append(float(np.abs(rgba.astype(np.int16)-last.astype(np.int16)).mean()))
        last=rgba.copy()
    writer.stdin.close()
    if writer.wait()!=0:raise RuntimeError('Encode failed')
    seam=float(np.abs(first.astype(np.int16)-last.astype(np.int16)).mean())
    if seam>np.median(changes):raise RuntimeError('Discontinuous loop')
    (root/f'{name}-loop.webm').replace(target)
    Image.fromarray(first).save(root/f'{name}-transparent-poster.png')
    Image.fromarray(last).save(root/f'{name}-transparent-idle.png')
    subprocess.run(['ffmpeg','-y','-v','error','-c:v','libvpx-vp9','-i',str(target),'-vf','scale=216:384','-c:v','libwebp_anim','-q:v','78','-compression_level','4','-loop','0',str(root/f'{name}-transparent-animated.webp')],check=True)
    print(f'{name}: 6s loop, seam={seam:.4f}, median={np.median(changes):.4f}',flush=True)
