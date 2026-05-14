let myFont;

let points = [];

let dragging = false;
let dragIndex = -1;

// tennis ball
let ballImg;

// bark sound
let barkSound;

let ball = {
  x: 90,
  y: 0,
  size: 85,

  vx: 0,
  vy: 0,

  active: false
};

function preload() {

  // font
  myFont = loadFont('fonts/milkyway.ttf');

  // tennis ball image
  ballImg = loadImage('images/toy.png');

  // bark sound
  barkSound = loadSound('sounds/bark.mp3');
}

function setup() {

  createCanvas(windowWidth, windowHeight);

  textFont(myFont);
  textAlign(CENTER, CENTER);

  // ball starts bottom left
  ball.y = height - 90;

  // create word points
  let word = "in";

  // visually centered
  let startX = width / 2 - 60;

  for (let i = 0; i < word.length; i++) {

    points.push({

      char: word[i],

      baseX: startX + i * 90,
      baseY: height / 2,

      x: startX + i * 90,
      y: height / 2,

      vx: 0,
      vy: 0,

      size: 240
    });
  }
}

function draw() {

  background('#2c2019');

  // =========================
  // BALL PHYSICS
  // =========================

  if (ball.active) {

    ball.x += ball.vx;
    ball.y += ball.vy;

    // friction
    ball.vx *= 0.992;
    ball.vy *= 0.992;

    // bounce walls
    if (ball.x < ball.size / 2) {

      ball.x = ball.size / 2;
      ball.vx *= -0.9;
    }

    if (ball.x > width - ball.size / 2) {

      ball.x = width - ball.size / 2;
      ball.vx *= -0.9;
    }

    if (ball.y < ball.size / 2) {

      ball.y = ball.size / 2;
      ball.vy *= -0.9;
    }

    if (ball.y > height - ball.size / 2) {

      ball.y = height - ball.size / 2;
      ball.vy *= -0.9;
    }
  }

  // hover effect
  let ballHover = dist(
    mouseX,
    mouseY,
    ball.x,
    ball.y
  );

  push();

  translate(ball.x, ball.y);

  let hoverScale = 1;

  if (ballHover < 80) {
    hoverScale = 1.08;
  }

  imageMode(CENTER);

  image(
    ballImg,
    0,
    0,
    ball.size * hoverScale,
    ball.size * hoverScale
  );

  pop();

  // =========================
  // ELASTIC TYPOGRAPHY
  // =========================

  for (let i = 0; i < points.length; i++) {

    let p = points[i];

    // dragging
    if (dragging && dragIndex === i) {

      p.x = mouseX;
      p.y = mouseY;
    }

    // spring force
    let springX = (p.baseX - p.x) * 0.06;
    let springY = (p.baseY - p.y) * 0.06;

    p.vx += springX;
    p.vy += springY;

    // friction
    p.vx *= 0.85;
    p.vy *= 0.85;

    // move
    if (!(dragging && dragIndex === i)) {

      p.x += p.vx;
      p.y += p.vy;
    }

    push();

    translate(p.x, p.y);

    // stretchy distortion
    let speed = abs(p.vx) + abs(p.vy);

    let stretchX = map(
      speed,
      0,
      40,
      1,
      1.45,
      true
    );

    let stretchY = map(
      speed,
      0,
      40,
      1,
      0.7,
      true
    );

    scale(stretchX, stretchY);

    // wobble
    rotate(
      sin(frameCount * 0.03 + i) * 0.04
    );

    fill('#c2b39f');

    noStroke();

    textSize(p.size);

    text(p.char, 0, 0);

    pop();
  }

  // connective elastic line
  stroke('#c2b39f');
  strokeWeight(8);
  noFill();

  beginShape();

  for (let p of points) {
    curveVertex(p.x, p.y);
  }

  endShape();
}

function mousePressed() {

  // =========================
  // BALL CLICK
  // =========================

  let dBall = dist(
    mouseX,
    mouseY,
    ball.x,
    ball.y
  );

  if (dBall < ball.size / 2) {

    ball.active = true;

    // random launch
    ball.vx = random(12, 20);
    ball.vy = random(-16, 16);

    // bark sound
    barkSound.play();

    return;
  }

  // =========================
  // LETTER DRAGGING
  // =========================

  for (let i = 0; i < points.length; i++) {

    let p = points[i];

    let d = dist(
      mouseX,
      mouseY,
      p.x,
      p.y
    );

    if (d < 120) {

      dragging = true;
      dragIndex = i;

      break;
    }
  }
}

function mouseReleased() {

  dragging = false;
  dragIndex = -1;
}

function windowResized() {

  resizeCanvas(
    windowWidth,
    windowHeight
  );

  ball.y = height - 90;
}