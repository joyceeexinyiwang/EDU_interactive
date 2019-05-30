# Interactive Component of the EDU project

This sketch allows audiences to engage with audio recordings and learn about history using physical gestures.

In progress by Joyce Wang and NaTasha Thompson  

- [User Guide](#user-guide)
- [How the Code Works](#how-the-code-works-behind-the-scene)
- [For Developer](#for-developer)

## User Guide

### How to launch it
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

#### Notes
- Works better when there is only one person in front the camera
- Only use **Chrome**!! (NEVER Microsoft Edge or IE)
- Tips on using [Windows command prompt](https://www.lifewire.com/list-of-command-prompt-commands-4092302)


## How the Code Works Behind the Scene

The two main components of the code are 1) **PoseNet** for motion capture, and 2) **p5.js**, as the basis for processing data and generating visuals.

### PoseNet
This interactive sketch uses **PoseNet** to detect human motions, which are then used to activate audio files.

[PoseNet](https://ml5js.org/docs/PoseNet) is a software tool for motion capture. It is a special version of this other tool called [OpenPose](https://github.com/CMU-Perceptual-Computing-Lab/openpose). It analyzes video footage in real-time, and outputs skeleton data when there are human beings in front of the camera. In the gif below, PoseNet is capturing the skeleton of its authors Gines Hidalgo (left) and Hanbyul Joo (right)!

![PoseNet is capturing the skeleton of its authors Gines Hidalgo (left) and Hanbyul Joo (right)!](/asset_doc/pose_face_hands.gif)

We are specifically looking at where the "nose" is. When the nose touches on one of the circles, an audio file gets triggered and starts playing.


### p5.js

[p5.js](https://p5js.org/)--a Javascript library--is used to call PoseNet and generate visuals in the browser.

If you are interested in looking at the code, check out [sketch.js](p5/runshow/sketch.js) in the package. It has all the commands that calls PoseNet, controls the interaction, and outputs the visual. 

Line 29-35 in the file (shown below) sets up a PoseNet "method," which intermittently gets skeleton data. 

```
  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function (results) {
    poses = results;
  });
```

The function `drawKeypoints()` starting on line 93 process the skeleton data to get what we want, e.g., eyes, ears, leftEar, etc. It draws all the keypoints as small white circles and highlights the eyes and the nose.

If you want to get into the technical details of PoseNet's algorithms, check out this [Medium article](https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5) written by [Dan Oved](https://www.danioved.com/), a creative technologist at Google. 


### MoCap for storytelling

Motion capture can be a really fun tool to tell stories that tradition mediums might not able to. One of Joyce's favorite professors, [Golan Levin](http://www.flong.com/), is a leading expert in interactive media art, and he has compiled a list of really cool motion-capture projects. You can find them [here](http://golancourses.net/2015/lectures/interactivity/full-body-interactive-art/) and [here](https://github.com/golanlevin/lectures/tree/master/lecture_expanded_body). Maybe these can give you a sense of how motion capture can be used to tell interesting stories.

If you have any questions regarding how this interaction was made, how to use motion capture, how to code, how to use code for stories, or anything related to all this, feel free to hit up Joyce (joycewang961226 at gmail dot com) and start a chat :)


## For Developer

### Dependencies
- Python 3.7
- Node.js
- browser-sync (`npm install -g browser-sync`)

### Sources
- [p5.js](https://p5js.org/)
- [PoseNet](https://ml5js.org/docs/posenet-webcam)