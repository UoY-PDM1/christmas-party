// VARIABLES

// images
let imgSleigh;
let imgSnow;
let imgHeart;

// audio
let blasterSound;
let backgroundMusic;
let bdMusic;
let smlaugh;
let hohoho;


// bullets array
let bullets = [];

// enemies
let imgIcicleEnemy;
let imgSnowMan;

// sleigh
let sleighX;
let sleighY;

// ice enemy
let iceX;
let iceY = 0;

// power up trigger
let lastTrigger2 = -1;

// snowman enemy
let snowManX;
let snowManY = 0;

let snowManHP = 6;

let nextBossScore = 40;
let bossActive = false;

// score
let counter = 0;

// hearts
let x1 = 350;
let x2 = 390;
let x3 = 430;

// lives
let lives = 3;

// rapid fire
let rapidFire = false;
let rapidFireDuration = 0;
let lastTrigger = -1;

// shooting cooldown
let fireCooldown = 0;

// shooting delay
let lastShotTime = 0;
let shootDelay = 500;

// PRELOAD IMAGES

function preload() {
  imgSleigh = loadImage('assets/sleigh.png');
  imgSnow = loadImage('assets/snowyfloor.jpg');
  imgIcicleEnemy = loadImage('assets/iceEnemy1.png');
  imgHeart = loadImage('assets/heart-15.png');
  imgSnowMan = loadImage('assets/snowMan.png');
  imgPenguin = loadImage('assets/penguin.png');
  imgReindeer = loadImage('assets/reindeer.png');

  blasterSound = loadSound('assets/blaster.mp3');
  backgroundMusic = loadSound('assets/hhchristmas.mp3');
  bdMusic = loadSound('assets/life.mp3');
  smlaugh = loadSound('assets/smlaugh.mp3');
  hohoho = loadSound('assets/hohoho.mp3');
}

// SETUP

function setup() {
  backgroundMusic.setVolume(0.7);
  backgroundMusic.loop();
  createCanvas(500, 800);
  imageMode(CENTER);

  // sleigh position
  sleighX = width / 2;
  sleighY = height - 150;

  // enemy start
  iceX = random(50, width - 50);
  frameRate(60)
 }

// DRAW LOOP

function draw() {
  // background
  background(255);
  image(imgSnow, 0, 0, width * 2, height * 2);

  if (lives <= 0 && counter < 225) {
    gameOver();
    return;
  }

  //end
  youWin();

  // game assets
  gameAssets();

  // UI
  UI();
  UItext();

  // bullets
  updateBullets();

  // enemies
  enemiesLvl1();

  enemiesBoss(); 

  healthBar();

  // collisions
  bulletCollision();

  bulletCollisionBoss();

  // life hearts
  life();

  // power-ups
  powerUp();
  powerUp2();

  // shooting system
  shootingSystem();
}


// GAME ASSETS

function gameAssets() {
  // constrain sleigh
  sleighX = constrain(mouseX, 10, width - 15);
  image(imgSleigh, sleighX, sleighY, width / 4, height / 5);
}


// UI

function UI() {
  rectMode(CENTER);
  fill(255, 0, 0, 150);
  rect(width / 2, height - 30, width, 75);
}

function UItext() {
  textSize(20);
  fill(0);
  textAlign(LEFT);
  text(`Score: ${counter}`, 25, 775);
}


// BULLETS

function updateBullets() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].y -= 10; // move up
    fill(0);
    circle(bullets[i].x, bullets[i].y, 10);

    if (bullets[i].y < 0) {
      bullets.splice(i, 1); // remove offscreen
    }
  }
}

function spawnBullet() {
  bullets.push({
    x: sleighX,
    y: sleighY - 50
  });
  blasterSound.play();
}

function mousePressed() {
  let currentTime = millis(); //current time ms

  if (!rapidFire) {
    if (currentTime - lastShotTime >= shootDelay) {
      spawnBullet();
      lastShotTime = currentTime;
    }
  } else {
      spawnBullet();
  }
}

// ENEMIES
// enemy 1
function enemiesLvl1() {
  let icicleSpeed = counter > 25 ? 6 : 3;
  if (counter >= 25 && counter < 30) {
    textAlign(CENTER);
    textSize(20);
    fill(random(255), random(255), random(255));
    text('Speed Up!', width / 2, 60)
  }

  image(imgIcicleEnemy, iceX, iceY, 100, 100);
  iceY += icicleSpeed;

  // reset enemy offscreen
  if (iceY > height - 100) {
    bdMusic.play();
    lives--;
    iceY = -50;
    iceX = random(50, width - 50);
  }

  // collision with sleigh
  if (
    iceX < sleighX + 100 &&
    iceX + 100 > sleighX &&
    iceY < sleighY + 100 &&
    iceY + 100 > sleighY
  ) {
    bdMusic.play();
    lives--;
    iceY = -50;
    iceX = random(50, width - 50);
  }
}

// enemy 2
function enemiesBoss() {
  if (!bossActive && counter >= nextBossScore) {
    bossActive = true;
    snowManHP = 8;
    snowManY = -150;
    snowManX = random(50, width - 50);
  }

  if (!bossActive) return;

  //draw boss
  if (counter >= 40 && counter <= 70 && bossActive) {
  image(imgSnowMan, snowManX, snowManY, 150, 150);
  textAlign(CENTER);
  textSize(20);
  fill(0);
  text('Alessandro HP:', width / 2, 50);
  }
  if (counter >= 110 && counter <= 130 && bossActive) {
  image(imgPenguin, snowManX, snowManY, 150, 150);
  textAlign(CENTER);
  textSize(20);
  fill(0);
  text('Saad HP:', width / 2, 50);
  }
  if (counter >= 180 && counter <= 200 && bossActive) {
  image(imgReindeer, snowManX, snowManY, 150, 150);
  textAlign(CENTER);
  textSize(20);
  fill(0);
  text('Abi HP:', width / 2, 50);
  }

  //move boss
  snowManY += 0.5 + counter / counter * 0.4;

  // lives decrease
  if (snowManY > height - 150) {
    bdMusic.play();
    lives -= 2;
    bossActive = false;

    nextBossScore += 50;
  }
}


// BULLET COLLISIONS

function bulletCollision() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    let d = dist(bullets[i].x, bullets[i].y, iceX, iceY);
    if (d < 50) {
      bullets.splice(i, 1);
      iceY = -50;
      iceX = random(50, width - 50);
      counter++;
    }
  }
}

function bulletCollisionBoss() {
  if (!bossActive) return;

  for (let i = bullets.length - 1; i >= 0; i--) {

    let d = dist(bullets[i].x, bullets[i].y, snowManX, snowManY);

    if (d < 70) {
      bullets.splice(i, 1); // remove bullet

      snowManHP -= 1; // DAMAGE

      if (snowManHP <= 0) {
        bossActive = false;
        nextBossScore += 50;

        snowManY = - 150;
        snowManX = random(50, width - 50);

        counter += 5;
        
       }
    }
  }
}



// LIFE SYSTEM

function life() {
  if (lives >= 1) image(imgHeart, x1, 765, 30, 30);
  if (lives >= 2) image(imgHeart, x2, 765, 30, 30);
  if (lives >= 3) image(imgHeart, x3, 765, 30, 30);
}


// POWER-UP

function powerUp() {
  if (counter % 30 === 0 && counter !== lastTrigger) {
    rapidFire = true;
    rapidFireDuration = 250;
    lastTrigger = counter;
    console.log('Rapid Fire On!');
  }

  if (rapidFire) {
    textSize(20)
    textAlign(CENTER)
    text('Rapid Fire On!', 200, 775);
  }

  if (counter <= 0) {
    rapidFire = false;
  }

  if (rapidFire) {
    rapidFireDuration--;
    if (rapidFireDuration <= 0) {
      rapidFire = false;
      console.log('Rapid Fire Off!');
    }
  }
}

function powerUp2() {
  if (counter >= 50) {
     shootDelay = 250;
     lastTrigger2 = counter;
     console.log('shooting speed up!')
  }
  if (counter >= 50 && counter < 55) {
     textSize(20);
     textAlign(CENTER);
     fill(random(255), random(255), random(255));
     text('Fire Rate Up!', width / 2, 60);
  }

  if (counter >= 100) {
     shootDelay = 150;
     lastTrigger2 = counter;
     console.log('shooting speed up!')
  }
     if (counter >= 100 && counter < 110) {
     textSize(20);
     textAlign(CENTER);
     fill(random(255), random(255), random(255));
     text('Fire Rate Up More!', width / 2, 60);
  }
}

// SHOOTING SYSTEM

function shootingSystem() {
  fireCooldown--;
  if (rapidFire && fireCooldown <= 0) {
    spawnBullet();
    fireCooldown = 5; // rapid-fire cooldown
  }
}


// GAME OVER

function gameOver() {
  background(255, 0, 0);
  textAlign(CENTER);
  textSize(50);
  fill(255);
  text('Game Over', width / 2, 400);
}

function millis() {
  return new Date().getTime();
}

function healthBar() {
  if (bossActive === true) {

  rectMode(CORNER);
  fill(255, 0, 0);
  rect(width / 3 - 5, 60, snowManHP * 30, 10);
  }
}

function youWin() {
  if (counter >= 225) {
    background(255, 0, 0);
    textAlign(CENTER);
    textSize(50);
    fill(255);
    text('Merry Christmas!', width / 2, 400);
    noLoop()
    hohoho.play();
  }
}
