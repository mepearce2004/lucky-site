let myFont;

let collarImg;
let treatsImg;
let luckImg;

let poloroid1;
let poloroid2;
let poloroid3;

let noteImg;

let memories = [];

let discovered = 0;
let memoryOpacity = 0;

function preload() {

  // font
  myFont = loadFont('fonts/milkyway.ttf');

  // images
  collarImg = loadImage('images/collar.png');
  treatsImg = loadImage('images/treats.png');
  luckImg = loadImage('images/luck.png');

  poloroid1 = loadImage('images/poloroid1.png');
  poloroid2 = loadImage('images/poloroid2.png');
  poloroid3 = loadImage('images/poloroid3.png');

  noteImg = loadImage('images/note.png');
}

function setup() {

  createCanvas(windowWidth, windowHeight);

  imageMode(CENTER);

  textAlign(CENTER, CENTER);
  textFont(myFont);
  textSize(180);

  memories = [

    {
      img: poloroid1,
      x: 180,
      y: 180,
      size: 230,

      found: false,

      dragging: false,
      offsetX: 0,
      offsetY: 0,

      vx: 0,
      vy: 0
    },

    {
      img: poloroid2,
      x: width - 220,
      y: 200,
      size: 240,

      found: false,

      dragging: false,
      offsetX: 0,
      offsetY: 0,

      vx: 0,
      vy: 0
    },

    {
      img: poloroid3,
      x: width - 300,
      y: height - 220,
      size: 250,

      found: false,

      dragging: false,
      offsetX: 0,
      offsetY: 0,

      vx: 0,
      vy: 0
    },

    {
      img: collarImg,
      x: width / 2,
      y: 120,
      size: 220,

      found: false,

      dragging: false,
      offsetX: 0,
      offsetY: 0,

      vx: 0,
      vy: 0
    },

    {
      img: treatsImg,
      x: 220,
      y: height - 170,
      size: 170,

      found: false,

      dragging: false,
      offsetX: 0,
      offsetY: 0,

      vx: 0,
      vy: 0
    },

    {
      img: luckImg,
      x: width / 2 - 100,
      y: height / 2 + 120,
      size: 260,

      found: false,

      dragging: false,
      offsetX: 0,
      offsetY: 0,

      vx: 0,
      vy: 0
    },

    // instruction note
    {
      img: noteImg,
      x: width / 2,
      y: height - 120,
      size: 320,

      found: true,

      dragging: false,
      offsetX: 0,
      offsetY: 0,

      vx: 0,
      vy: 0
    }

  ];
}

function draw() {

  background('#2c2019');

  for (let m of memories) {

    // floating momentum
    if (!m.dragging) {

      m.x += m.vx;
      m.y += m.vy;

      // friction
      m.vx *= 0.96;
      m.vy *= 0.96;

      // bounce off walls
      if (m.x < m.size / 2) {
        m.x = m.size / 2;
        m.vx *= -0.8;
      }

      if (m.x > width - m.size / 2) {
        m.x = width - m.size / 2;
        m.vx *= -0.8;
      }

      if (m.y < m.size / 2) {
        m.y = m.size / 2;
        m.vy *= -0.8;
      }

      if (m.y > height - m.size / 2) {
        m.y = height - m.size / 2;
        m.vy *= -0.8;
      }
    }

    // dragging
    if (m.dragging) {

      let targetX = mouseX + m.offsetX;
      let targetY = mouseY + m.offsetY;

      // throw velocity
      m.vx = targetX - m.x;
      m.vy = targetY - m.y;

      m.x = targetX;
      m.y = targetY;
    }

    let d = dist(mouseX, mouseY, m.x, m.y);

    // darker reveal effect
    let reveal = map(d, 0, 250, 255, 3, true);

    // note slightly visible
    if (m.img === noteImg) {
      reveal = map(d, 0, 300, 255, 8, true);
    }

    // count discoveries
    if (reveal > 120 && !m.found) {
      m.found = true;
      discovered++;
    }

    push();

    tint(255, reveal);

    let hoverScale = 1;

    // hover enlargement
    if (d < 150) {
      hoverScale = 1.12;
    }

    translate(m.x, m.y);

    // floating rotation
    rotate(
      sin(frameCount * 0.01 + m.x) * 0.03
    );

    image(
      m.img,
      0,
      0,
      m.size * hoverScale,
      m.size * hoverScale
    );

    pop();
  }

  // reveal MEMORY + continue button
  if (discovered >= 5) {

    memoryOpacity += 2;

    let btn = document.querySelector('.memory-bone');

    if (btn) {
      btn.classList.add('show');
    }

    fill(194, 179, 159, memoryOpacity);

    text(
      "memory",
      width / 2,
      height / 2
    );
  }
}

function mousePressed() {

  for (let i = memories.length - 1; i >= 0; i--) {

    let m = memories[i];

    let d = dist(mouseX, mouseY, m.x, m.y);

    if (d < m.size / 2) {

      m.dragging = true;

      m.offsetX = m.x - mouseX;
      m.offsetY = m.y - mouseY;

      break;
    }
  }
}

function mouseReleased() {

  for (let m of memories) {
    m.dragging = false;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}