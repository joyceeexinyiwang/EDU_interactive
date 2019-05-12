let video;
let poseNet;
let poses = [];
let skeletons = [];
let color1;
let color2;

//https://github.com/tensorflow/tfjs/issues/534

function preload() {
  eye = loadImage('assets/eye.png');
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
  
  color1 = color(255);
  color2 = color(255);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  background(251);
  image(video, width/2, height/2, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
  
  color1 = color(random(100, 255), random(100, 255), random(100, 255), random(100, 150));
  color2 = color(random(100, 255), random(100, 255), random(100, 255), random(200, 255));
  
  // save();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  var appearance = {};
  var positions = {};
  appearance.leftEye = false;
  appearance.rightEye = false;
  appearance.nose= false;
  appearance.leftEye= false;
  appearance.rightEye= false;
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
  positions.leftEye= {};
  positions.rightEye= {};
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
        fill(0);
        // text(keypoint.part, keypoint.position.x, keypoint.position.y);
  			appearance[keypoint.part] = true;
        positions[keypoint.part].x= keypoint.position.x;
        positions[keypoint.part].y = keypoint.position.y;

      }
    }
  }
  
  noStroke();
  if (appearance.rightEye && appearance.leftEye) {    
    var headwidth = (positions.rightEye.x - positions.leftEye.x) * 2.5;
    headx = (positions.leftEye.x + positions.rightEye.x)/2;
    heady = (positions.rightEye.y + positions.leftEye.y)/2 - headwidth/7;

    fill(color1, 200);
    ellipse(headx, heady, headwidth, headwidth * 1.2);
    
    fill(0);
    var eyesize = headwidth/4;
    image(eye, positions.leftEye.x, positions.leftEye.y, eyesize, eyesize*eye.height/eye.width);
    image(eye, positions.rightEye.x, positions.rightEye.y, eyesize, eyesize*eye.height/eye.width);
  }
  
  if (appearance.rightHip && appearance.leftHip && appearance.leftShoulder && appearance.rightShoulder) {
    fill(color1);
    beginShape();
    vertex(positions.leftHip.x, positions.leftHip.y);
    vertex(positions.rightHip.x, positions.rightHip.y);
    vertex(positions.rightShoulder.x, positions.rightShoulder.y);
    vertex(positions.leftShoulder.x, positions.leftShoulder.y);
    endShape(CLOSE);
  }
  
  if (appearance.leftShoulder && appearance.leftElbow && appearance.leftHip) {
    print("hoo");
    stroke(color2);
    strokeWeight(5);
    curve(positions.leftHip.x, positions.leftHip.y, positions.leftElbow.x, positions.leftElbow.y, positions.leftShoulder.x, positions.leftShoulder.y);
  }
  
  
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    // For every skeleton, loop through all body connections
    for (let j = 0; j < poses[i].skeleton.length; j++) {
      let partA = poses[i].skeleton[j][0];
      let partB = poses[i].skeleton[j][1];
      stroke(color2);
      var scale = 15;
      var repeats = 5;
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
			for (let k = 0; k < repeats; k++) {
			line(partA.position.x-randomGaussian(0, scale), partA.position.y-randomGaussian(0, scale), partB.position.x-randomGaussian(0, scale), partB.position.y-randomGaussian(0, scale));
			line(partA.position.x-randomGaussian(0, scale), partA.position.y+randomGaussian(0, scale), partB.position.x+randomGaussian(0, scale), partB.position.y+randomGaussian(0, scale));
			}
    }
  }
}

function mouseClicked(){
  save('myCanvas.png');
}