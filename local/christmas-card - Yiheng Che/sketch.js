let starShow = false;
let song;
let greetingText = "Click to open the greeting card";

function setup() {
  createCanvas(400, 200);
  // Set the background to green
  background(0, 100, 0);
  song = loadSound('assets/song.mp3');
  textAlign(CENTER, CENTER);
  textSize(13);
  fill(150, 0, 0);
  text(greetingText, width / 2, height / 2);
}

function draw() {
  // No need to add anything in the draw function
}

function mouseClicked() {
  // Hide the "Click to open the greeting card" text on click
  if (!starShow) {
    background(0, 100, 0); // Clear the canvas
    starShow = true;

    // Display "Merry Christmas" in red text at the center of the canvas
    fill(150, 0, 0); // Set to red
    textSize(32);   // Set text size
    textAlign(CENTER, CENTER); // Center-align the text
    text("Merry Christmas", width / 2, height / 2);

    // Display light yellow stars around the "Merry Christmas" text
    fill(255, 255, 150); // Set to light yellow
    for (let i = 0; i < 5; i++) {
      let starX = random(50, 350); // Random x position within the canvas
      let starY = random(50, 150); // Random y position within the canvas
      star(starX, starY, 10, 5, 5); // Call the star function
    }

    if (!song.isPlaying()) {
      song.play();
    }
  }
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
