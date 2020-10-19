// Name any p5.js functions we use in the global so Glitch can recognize them.
/* global createCanvas windowWidth windowHeight colorMode HSL text background random
   width height fill noStroke ellipse soundFormats loadSound*/

let dot, dots, mySound, bc, cnv;
function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('https://cdn.glitch.com/6180bf71-468b-4dad-9b6a-624d7ba3b479%2FRick%20Astley%20-%20Never%20Gonna%20Give%20You%20Up%20(Video).mp3?v=1594934686684');
  cnv = createCanvas(100, 100);
}
function setup() {
 // createCanvas(windowWidth - 75, windowHeight - 75);
  colorMode(HSL, 360, 100, 100);
  bc = 20

  let cnv = createCanvas(700, 800);
  cnv.mousePressed(canvasPressed);
  text('tap here to play', 10, 20);
  
  dots = [];
  for (let i = 0; i < 1000; i++) {
    dot = new BouncyDot();
    dots.push(dot);
  }
}

function draw() {
  background(bc, 60, 40);
  bc +=1
  if(bc > 360){
    bc = 20
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].float();
    dots[i].display();
  }
}


function mousePressed() {
  // We'll use this for console log statements only.
  console.log(dots[0].x);
}
function canvasPressed() {
  // playing a sound file on a user gesture
  // is equivalent to `userStartAudio()`
  mySound.play();
}
class BouncyDot {
  constructor() {
    // Randomly generate position
    this.x = random(width);
    this.y = random(height);
    // Randomly generate radius
    this.r = random(5, 12);
    // Randomly generate color
    this.color = random(360);
    // Randomly generate a master velocity (broken into components)...
    this.masterXvelocity = random(0.5, 3);
    this.masterYvelocity = random(0.5, 3);
    // ...and use those as starting velocities.
    this.xVelocity = this.masterXvelocity;
    this.yVelocity = this.masterYvelocity;
  }

  float() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    // Standard bounce code - like the DVD logo, but for spheres.
    if (this.x + this.r > width) {
      this.xVelocity = -1 * this.masterXvelocity;
    }
    if (this.x - this.r < 0) {
      this.xVelocity = this.masterXvelocity;
    }
    if (this.y + this.r > height) {
      this.yVelocity = -1 * this.masterYvelocity;
    }
    if (this.y - this.r < 0) {
      this.yVelocity = this.masterYvelocity;
    }
  }

  display() {
    fill(this.color, 50, 70);
    if(bc >100){
      bc =20
    }
    noStroke();
    ellipse(this.x, this.y, this.r * 2);
  }
  
}
