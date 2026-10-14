"""Trim the inactive start/tail and create a smooth, real-alpha thinking loop.
Run remove-thinking-background.py first. Original uploaded footage stays intact.
This resamples only adjacent source frames, never crossfades unrelated poses.
"""
from pathlib import Path
import subprocess
import numpy as np

root=Path(__file__).resolve().parents[1]
source=root/'src/assets/thinking-transparent-base.webm'
output=root/'src/assets/thinking-transparent.webm'
width,height,fps=432,768,24
raw=subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-c:v','libvpx-vp9','-i',str(source),'-f','rawvideo','-pix_fmt','rgba','pipe:1'],stdout=subprocess.PIPE,check=True).stdout
frames=np.frombuffer(raw,dtype=np.uint8).reshape(-1,height,width,4)
if len(frames)!=192:raise RuntimeError('Expected original eight-second source')
# Use the active thinking section: 2.42–5.75 seconds, discarding the standing intro.
start,end=58,138
count=192
writer=subprocess.Popen(['ffmpeg','-y','-hide_banner','-loglevel','error','-f','rawvideo','-pix_fmt','rgba','-s',f'{width}x{height}','-r',str(fps),'-i','pipe:0','-an','-c:v','libvpx-vp9','-pix_fmt','yuva420p','-auto-alt-ref','0','-b:v','0','-crf','24','-cpu-used','4','-row-mt','1',str(output)],stdin=subprocess.PIPE)
first=last=None
changes=[]
for index in range(count):
    # Cosine timing eases direction changes without a stopped introductory hold.
    position=start+(end-start)*(1-np.cos(2*np.pi*index/count))/2
    lo=int(np.floor(position));hi=min(lo+1,len(frames)-1);weight=position-lo
    a=frames[lo].astype(np.float32)/255;b=frames[hi].astype(np.float32)/255
    alpha=a[:,:,3:4]*(1-weight)+b[:,:,3:4]*weight
    # Premultiplied interpolation preserves clean transparent edges.
    premult=a[:,:,:3]*a[:,:,3:4]*(1-weight)+b[:,:,:3]*b[:,:,3:4]*weight
    rgb=np.divide(premult,alpha,out=np.zeros_like(premult),where=alpha>0)
    rgba=np.clip(np.concatenate([rgb,alpha],axis=2)*255+.5,0,255).astype(np.uint8)
    writer.stdin.write(rgba.tobytes())
    if first is None:first=rgba.copy()
    if last is not None:changes.append(float(np.abs(rgba.astype(np.int16)-last.astype(np.int16)).mean()))
    last=rgba.copy()
writer.stdin.close()
if writer.wait()!=0:raise RuntimeError('Encoding failed')
seam=float(np.abs(first.astype(np.int16)-last.astype(np.int16)).mean())
if seam>np.median(changes):raise RuntimeError(f'Unexpected loop seam: {seam}')
for name,frame in [('thinking-transparent-poster.png',first),('thinking-transparent-idle.png',last)]:
    subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error','-f','rawvideo','-pix_fmt','rgba','-s',f'{width}x{height}','-i','pipe:0','-frames:v','1',str(root/'src/assets'/name)],input=frame.tobytes(),check=True)
print(f'Active source: {start/fps:.2f}–{end/fps:.2f} s. Seam difference {seam:.4f}; median adjacent-frame difference {np.median(changes):.4f}.')
