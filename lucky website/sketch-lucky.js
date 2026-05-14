let myFont;
let pawImg;
let paws = [];

function preload() {
  myFont = loadFont('fonts/milkyway.ttf');
  pawImg = loadImage('images/paw.png');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('pointer-events', 'none'); 

  textFont(myFont);
  textSize(180);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
}

function draw() {
  clear();

  let x = width / 2;
  let y = height / 2;

  let w = textWidth("lucky");
  let h = 60;

  let hovering =
    mouseX > x - w / 2 &&
    mouseX < x + w / 2 &&
    mouseY > y - h / 2 &&
    mouseY < y + h / 2;

  push();

  translate(x, y);

  if (hovering) {
  rotate(sin(frameCount * 0.12) * 0.06);
}

  fill('#000000');
  text("lucky", 0, 0);

  pop();

  for (let p of paws) {
    push();
    translate(p.x, p.y);
    rotate(p.angle);

    tint(255, p.alpha);
    image(pawImg, 0, 0, p.size, p.size);

    pop();

    p.alpha -= 0.7;
  }

  paws = paws.filter(p => p.alpha > 0);
}

// ✅ moved click detection here
document.addEventListener("click", (e) => {
  let x = width / 2;
  let y = height / 2;

  let w = textWidth("lucky");
  let h = 60;

  if (
    e.clientX > x - w / 2 &&
    e.clientX < x + w / 2 &&
    e.clientY > y - h / 2 &&
    e.clientY < y + h / 2
  ) {
    paws.push({
      x: random(width),
      y: random(height),
      angle: random(-PI, PI),
      size: random(20, 60),
      alpha: 255
    });

    // 🦴 show button
    let btn = document.getElementById("tagBtn");
    if (btn) {
      btn.classList.add("show");
    }
  }
});

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}