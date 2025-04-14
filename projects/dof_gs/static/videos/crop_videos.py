import os 
import numpy as np
import imageio 
from glob import glob 

data_dir = '.\\'
for video_file in glob(os.path.join(data_dir, '*.mp4')):
    if 'cropped' not in video_file:
        print(video_file)
        reader = imageio.get_reader(video_file)
        fps = reader.get_meta_data()['fps']
        reader.close()

        frames = imageio.mimread(video_file, memtest=False)
        frames = np.stack(frames, 0)
        frames = frames[0:, 40:-40, ...]
        save_name = str.replace(video_file, '.mp4', '-cropped-border.mp4')
        imageio.mimwrite(save_name, frames, fps=fps)