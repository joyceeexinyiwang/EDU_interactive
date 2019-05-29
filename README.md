# interactive part of the EDU project

in progress by joyce wang and NaTasha Thompson  

## How to launch it
- (If there is an update) download this github package
- Save to the desired folder (e.g. Desktop) and extract folder
- In command prompt, navigate to the folder that was just downloaded
  - To move to a sub folder, enter `cd FolderName`
  - To see what's in the current folder, enter `dir`
  - To go up a folder, enter `cd ..`
  - Eventually, the path of the folder will look something like `Desktop/EDU_interactive-master/EDU_interactive-master/`)
- In command prompt, enter `browser-sync start --server --directory --files "*"`
- A browser (Chrome) will be automatically opened. Navigate to open the html file `./p5/runshow/index.html`
- Allow browser to access camera and turn audio on
- Play! (use your nose to activate audio files)

### Notes
- Works better when there is only one person in front the camera
- Only use **Chrome**!! (NEVER Microsoft Edge or IE)
- Tips on using [Windows command prompt](https://www.lifewire.com/list-of-command-prompt-commands-4092302)

## How PoseNet works behind the scene

This interactive media component uses **PoseNet** to detect human motions, which are then used to activate audio files.

[PoseNet](https://ml5js.org/docs/PoseNet) is a software tool for motion capture. It is a special version of this other tool called [OpenPose](https://github.com/CMU-Perceptual-Computing-Lab/openpose). It analyzes video footage in real-time, and outputs skeleton data when there are human beings in front of the camera.

![PoseNet is capturing the skeleton of its authors Gines Hidalgo (left) and Hanbyul Joo (right)!](/asset_doc/pose_face_hands.gif)

The code of this project uses PoseNet to get the skeleton data of our audience. We are specifically looking at where the "nose" is. When the nose touches on one of the circles, an audio file gets triggered and starts playing.

To show a glimpse of how the code does this, take a look in [this file](https://github.com/joyceeexinyiwang/EDU_interactive/blob/master/p5/runshow/sketch.js). Check out line XXX, we get the coordinates of the ....

Motion capture can be a really fun tool to tell stories that tradition mediums might not able to. One of Joyce's favorite professors, [Golan Levin](http://www.flong.com/), is a leading expert in interactive media art, and he has compiled a list of really cool motion-capture projects. You can find them [here](http://golancourses.net/2015/lectures/interactivity/full-body-interactive-art/) and [here](https://github.com/golanlevin/lectures/tree/master/lecture_expanded_body). Maybe these can give you a sense of how motion capture can be used to tell interesting stories.

If you want to get into the technical details of PoseNet's algorithms, check out this [Medium article](https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5) written by [Dan Oved](https://www.danioved.com/), a creative technologist at Google. 

If you have any questions regarding how this interaction was made, how to use motion capture, how to code, how to use code for stories, or anything related to all this, feel free to hit up Joyce (joycewang961226 at gmail dot com) and start a chat :)

---

## For developer

### Dependencies
- Python 3.7
- Node.js
- browser-sync (`npm install -g browser-sync`)

### Sources
- [p5.js](https://p5js.org/)
- [PoseNet](https://ml5js.org/docs/posenet-webcam)