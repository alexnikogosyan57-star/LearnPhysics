"""Prepare an alpha greeting from original footage, preserving the robot RGB.
One-time asset tooling: rembg[cpu], OpenCV, SciPy, ffmpeg. The runtime is plain video.
The official U2Net model is fetched with rembg's checksum verification intact.
"""
from pathlib import Path
import subprocess
import numpy as np
import cv2
from PIL import Image
from scipy import ndimage
from rembg import new_session
import onnxruntime as ort

root=Path(__file__).resolve().parents[1]
width,height,fps=432,768,24
options=ort.SessionOptions();options.intra_op_num_threads=2;options.inter_op_num_threads=1
session=new_session('u2net',sess_opts=options,providers=['CPUExecutionProvider'])
reader=subprocess.Popen(['ffmpeg','-hide_banner','-loglevel','error','-ss','0.5','-i',str(root/'src/assets/greeting.mp4'),'-vf',f'scale={width}:{height}','-f','rawvideo','-pix_fmt','rgb24','pipe:1'],stdout=subprocess.PIPE)
writer=subprocess.Popen(['ffmpeg','-y','-hide_banner','-loglevel','error','-f','rawvideo','-pix_fmt','rgba','-s',f'{width}x{height}','-r',str(fps),'-i','pipe:0','-an','-c:v','libvpx-vp9','-pix_fmt','yuva420p','-auto-alt-ref','0','-b:v','0','-crf','24','-cpu-used','4','-row-mt','1',str(root/'src/assets/greeting-transparent.webm')],stdin=subprocess.PIPE)
index=0;first=last=None
while True:
    raw=reader.stdout.read(width*height*3)
    if not raw:break
    if len(raw)!=width*height*3:raise RuntimeError('Incomplete source frame')
    rgb=np.frombuffer(raw,np.uint8).reshape(height,width,3)
    prediction=np.asarray(session.predict(Image.fromarray(rgb))[0]).astype(np.float32)/255
    alpha=np.clip((prediction-.25)/.65,0,1)
    # Protect the ivory forehead plate: its color nearly matches the source backdrop.
    # Restrict small-gap repair to the head; waving fingers remain untouched.
    closed=cv2.morphologyEx((alpha>.6).astype(np.uint8),cv2.MORPH_CLOSE,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(31,31)))
    repaired=ndimage.gaussian_filter(closed.astype(np.float32),.5)
    alpha[100:210,90:310]=np.maximum(alpha[100:210,90:310],repaired[100:210,90:310])
    alpha=np.clip(alpha*255+.5,0,255).astype(np.uint8)
    alpha[alpha<3]=0
    rgba=np.dstack([rgb,alpha]);rgba[alpha==0,:3]=0
    if alpha[0,0]!=0:raise RuntimeError('Background remained opaque')
    writer.stdin.write(rgba.tobytes())
    if first is None:first=rgba.copy()
    last=rgba.copy();index+=1
    if index%24==0:print(f'Greeting matte: {index} frames',flush=True)
writer.stdin.close()
if writer.wait()!=0 or reader.wait()!=0 or index!=132:raise RuntimeError(f'Greeting preparation failed ({index} frames)')
for name,frame in [('greeting-transparent-poster.png',first),('greeting-transparent-idle.png',last)]:
    subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error','-f','rawvideo','-pix_fmt','rgba','-s',f'{width}x{height}','-i','pipe:0','-frames:v','1',str(root/'src/assets'/name)],input=frame.tobytes(),check=True)
print('Prepared a 5.5-second transparent greeting, without replacing the original footage.')

subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error','-c:v','libvpx-vp9','-i',str(root/'src/assets/greeting-transparent.webm'),'-vf','scale=288:512','-c:v','libwebp_anim','-q:v','80','-compression_level','4','-loop','1',str(root/'src/assets/greeting-transparent-animated.webp')],check=True)
