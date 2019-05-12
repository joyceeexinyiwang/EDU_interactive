let video;
let poseNet;
let poses = [];
let skeletons = [];
let color1;
let color2;
let audio_n;
let audios = [];
let audios_pos = [];
let playing;

//https://github.com/tensorflow/tfjs/issues/534

function preload() {
  eye = loadImage('assets/eye.png');
  house = loadImage('assets/house_2.png');
  audio_n = 6;
  for (var i = 0; i < audio_n; i++) {
    var filename = "Part" + str(i)+".mp3";
    a = loadSound('assets/audio/'+filename);
    audios.push(a);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);  
  frameRate(24);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function (results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
  
  ellipseMode(CENTER);
  imageMode(CENTER);

  color1 = color(255, 200);
  color2 = color(255, 150);
  color_audio = color(255, 200);

  for (var i = 0; i < audio_n; i++) {
    a_pos = {};
    a_pos.x = (width*3/5)*i/audio_n + width*1/5 * (1+0.5/audio_n);
    a_pos.y = random(height/4, height*3/4);
    audios_pos.push(a_pos);
  }

  print(audios_pos);

  playing = -1;

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  background(251);
  translate(width,0); // move to far corner
  scale(-1.0,1.0);    // flip x-axis backwards
  image(video, width/2, height/2, width, width * 240/320);
  image(house, width/2, height/2, width, width * house.height/house.width);
  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawAudios();
  drawSkeleton();
}

function drawAudios() {
  for (var i = 0; i < audio_n; i++) {
    var a_pos = audios_pos[i];
    var s = 30;
    if (i == playing) {
      s = 60;
    }
    fill(color_audio);
    noStroke();
    ellipse(a_pos.x, a_pos.y, s, s);
  }
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  var appearance = {};
  var positions = {};
  appearance.leftEye = false;
  appearance.rightEye = false;
  appearance.nose= false;
  appearance.leftEar= false;
  appearance.rightEar= false;
  appearance.leftShoulder= false;
  appearance.rightShoulder= false;
  appearance.leftElbow= false;
  appearance.rightElbow= false;
  appearance.leftWrist= false;
  appearance.rightWrist= false;
  appearance.leftHip= false;
  appearance.rightHip= false;
  appearance.leftKnee= false;
  appearance.rightKnee= false;
  appearance.leftAnkle= false;
  appearance.rightAnkle= false;
  
  positions.leftEye = {};
  positions.rightEye = {};
  positions.nose= {};
  positions.leftEar= {};
  positions.rightEar= {};
  positions.leftShoulder= {};
  positions.rightShoulder= {};
  positions.leftElbow= {};
  positions.rightElbow= {};
  positions.leftWrist= {};
  positions.rightWrist= {};
  positions.leftHip= {};
  positions.rightHip= {};
  positions.leftKnee= {};
  positions.rightKnee= {};
  positions.leftAnkle= {};
  positions.rightAnkle= {};
  
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = poses[i].pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        // text(keypoint.part, keypoint.position.x, keypoint.position.y);
        if (keypoint.part == "leftEar" || keypoint.part == "rightEar") {
          // don't draw the ears
        } else {
          stroke(color2);
          fill(color1);
          ellipse(keypoint.position.x, keypoint.position.y, 5,5);
    			appearance[keypoint.part] = true;
          positions[keypoint.part].x= keypoint.position.x;
          positions[keypoint.part].y = keypoint.position.y;
        }
      }
    }
  }
  
  if (appearance.rightEye && appearance.leftEye) {    
    var headwidth = (positions.rightEye.x - positions.leftEye.x) * 2.5;
    headx = (positions.leftEye.x + positions.rightEye.x)/2;
    heady = (positions.rightEye.y + positions.leftEye.y)/2 - headwidth/7;

    // fill(color1, 200);
    // ellipse(headx, heady, headwidth, headwidth * 1.2);
    checkHead(headx, heady);
    
    stroke(color2);
    fill(color1);
    var eyesize = headwidth/4;
    image(eye, positions.leftEye.x, positions.leftEye.y, eyesize, eyesize*eye.height/eye.width);
    image(eye, positions.rightEye.x, positions.rightEye.y, eyesize, eyesize*eye.height/eye.width);
  }
  
  if (appearance.rightHip && appearance.leftHip && appearance.leftShoulder && appearance.rightShoulder) {
    stroke(color2);
    fill(color1);
    beginShape();
    vertex(positions.leftHip.x, positions.leftHip.y);
    vertex(positions.rightHip.x, positions.rightHip.y);
    vertex(positions.rightShoulder.x, positions.rightShoulder.y);
    vertex(positions.leftShoulder.x, positions.leftShoulder.y);
    endShape(CLOSE);
  }
  
  if (appearance.leftShoulder && appearance.leftElbow && appearance.leftHip) {
    stroke(color2);
    curve(positions.leftHip.x, positions.leftHip.y, positions.leftElbow.x, positions.leftElbow.y, positions.leftShoulder.x, positions.leftShoulder.y);
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  strokeWeight(5);
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    // For every skeleton, loop through all body connections
    for (let j = 0; j < poses[i].skeleton.length; j++) {
      let partA = poses[i].skeleton[j][0];
      let partB = poses[i].skeleton[j][1];
      stroke(color2);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

function checkHead(headx, heady) {
  for (var i = 0; i < audio_n; i++) {
    var a_pos = audios_pos[i];
    var dis = sqrt((headx-a_pos.x)*(headx-a_pos.x) + (heady-a_pos.y)*(heady-a_pos.y));
    if (dis < 30) {
      if (playing != i) {
        if (playing != -1) {
          audios[playing].stop();
        } 
        playing = i;
        audios[playing].play();
      }
    }
  }
}

// function mouseClicked(){
//   save('myCanvas.png');
// }