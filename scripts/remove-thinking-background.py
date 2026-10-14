"""Derive a transparent animation from the supplied, opaque checkerboard video.
Requires ffmpeg, numpy and scipy only during asset preparation.
The original MP4 remains unchanged. No generative alteration of the robot.
"""
from pathlib import Path
import subprocess
import numpy as np
from scipy import ndimage

root = Path(__file__).resolve().parents[1]
source = root / 'src/assets/thinking.mp4'
output = root / 'src/assets/thinking-transparent.webm'
width, height, fps = 432, 768, 24
reader = subprocess.Popen(['ffmpeg','-hide_banner','-loglevel','error','-i',str(source),'-vf',f'scale={width}:{height}','-f','rawvideo','-pix_fmt','rgb24','pipe:1'],stdout=subprocess.PIPE)
writer = subprocess.Popen(['ffmpeg','-y','-hide_banner','-loglevel','error','-f','rawvideo','-pix_fmt','rgba','-s',f'{width}x{height}','-r',str(fps),'-i','pipe:0','-an','-c:v','libvpx-vp9','-pix_fmt','yuva420p','-auto-alt-ref','0','-b:v','0','-crf','24','-cpu-used','4','-row-mt','1',str(output)],stdin=subprocess.PIPE)
frames=0
while True:
    raw=reader.stdout.read(width*height*3)
    if not raw:break
    if len(raw)!=width*height*3:raise RuntimeError('Incomplete decoded frame')
    rgb=np.frombuffer(raw,dtype=np.uint8).reshape(height,width,3)
    # Only bright neutral components are candidates; warm shell and dark joints remain.
    spread=rgb.max(axis=2).astype(np.int16)-rgb.min(axis=2)
    candidate=(spread<15)&(rgb.mean(axis=2)>205)
    labels,count=ndimage.label(candidate)
    sizes=np.bincount(labels.ravel())
    edge_labels=np.unique(np.concatenate([labels[0],labels[-1],labels[:,0],labels[:,-1]]))
    background=np.isin(labels,edge_labels[edge_labels!=0])
    # Background gaps enclosed by bent arms are retained by edge-only flood fill;
    # remove large neutral islands as well, preserving small eye highlights.
    background |= candidate & (sizes[labels]>128)
    foreground=~background
    object_labels,objects=ndimage.label(foreground)
    object_sizes=np.bincount(object_labels.ravel());object_sizes[0]=0
    foreground=object_labels==object_sizes.argmax()
    alpha=ndimage.gaussian_filter(ndimage.binary_erosion(foreground,iterations=1).astype(np.float32),.55)
    alpha=np.clip(alpha*255,0,255).astype(np.uint8)
    rgba=np.dstack([rgb,alpha]);rgba[alpha==0,:3]=0
    writer.stdin.write(rgba.tobytes())
    if frames in [0,191]:
        # PNGs are exported directly from the video-processing output.
        target=root/'src/assets'/('thinking-transparent-poster.png' if frames==0 else 'thinking-transparent-idle.png')
        subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error','-f','rawvideo','-pix_fmt','rgba','-s',f'{width}x{height}','-i','pipe:0','-frames:v','1',str(target)],input=rgba.tobytes(),check=True)
    frames+=1
writer.stdin.close()
if writer.wait()!=0 or reader.wait()!=0:raise RuntimeError('Video processing failed')
if frames!=192:raise RuntimeError(f'Expected 192 frames, got {frames}')
print(f'Prepared {frames} frames with real alpha: {output}')
