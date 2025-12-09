class Santa {
    constructor() {
        this.x = 50;
        this.y = 300;
        this.width = 100;
        this.height = 100;
        this.speed = 5;
        this.health = 100;
        this.maxHealth = 100;
    }
    draw() {
        imageMode(CENTER);
        image(santaImg, this.x, this.y, this.width, this.height);

        // Draw health bar above Santa
        fill(255, 0, 0);
        noStroke();
        let healthWidth = (this.health / this.maxHealth) * this.width; // proportion manually
        rect(this.x - this.width / 2, this.y - this.height / 2 - 10, healthWidth, 10);

        stroke(0);
        noFill();
        rect(this.x - this.width / 2, this.y - this.height / 2 - 10, this.width, 10); // border
    }
    move() {
        if (keyIsDown(87)) { // w
            this.y -= this.speed;
        }
        if (keyIsDown(65)) { // a
            this.x -= this.speed;
        }
        if (keyIsDown(83)) { // s
            this.y += this.speed;
        }
        if (keyIsDown(68)) { // d
            this.x += this.speed;
        }
        // stops at walls
        this.x = constrain(this.x, this.width / 2, width - this.width / 2);
        this.y = constrain(this.y, this.height / 2, height - this.height / 2);
    }
}

class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 8;
        this.size = 8;
    }
    draw() {
        fill(255);
        strokeWeight(1);
        circle(this.x, this.y, this.size);
    }
    move() {
        this.x += this.speed; // shoots right
    }

    offScreen() {
        return this.x > width;
    }
}

class Elf {
    constructor() {
        this.width = 100;
        this.height = 100;
        this.x = width + this.width;
        this.y = random(this.height/ 2, height - this. height / 2)
        this.speed = 3;
        this.img = random([elf1Img, elf2Img, elf3Img]);
        this.isHit = false;
    }
    draw() {
        imageMode(CENTER);
        image(this.img, this.x, this.y, this.width, this.height);
    }
    move() {
        this.x -= this.speed
    }
}

let santaImg;
let elf1Img;
let elf2Img;
let elf3Img;
let explosion;
let gameOver = false;
let score = 0;

let santa;

let bullets = [];
let elves = [];
let explosions = [];

function preload() {
    santaImg = loadImage("assets/New Piskel (1).png");
    elf1Img = loadImage("assets/New Piskel (2).png");
    elf2Img = loadImage("assets/New Piskel (3).png");
    elf3Img = loadImage("assets/New Piskel (4).png");
    explosion = loadImage("assets/pixilart-drawing.png");
    scoreFont = loadFont("assets/Amore Christmas.otf");
}

function setup() {
    createCanvas(530, 700);
    santa = new Santa();
}

function draw() {
    background(173, 216, 230);
    drawScore();
    santa.draw();
    santa.move();

    // GAME OVER
    if (gameOver) {
        textAlign(CENTER, CENTER);
        textSize(50);
        fill(0);
        text("GAME OVER", width / 2, height / 2);
        return; // stop the game loop

    }

    // BULLETS
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].move();
        bullets[i].draw();


        let bulletRemoved = false;

        if (bullets[i].offScreen()) {
            bullets.splice(i, 1); // removes bullet
            bulletRemoved = true;
        }

        if (!bulletRemoved) {
            for (let j = elves.length - 1; j >= 0; j--) {
                if (collision(bullets[i], elves[j])) {
                    explosions.push({ x: elves[j].x, y: elves[j].y, timer: 30 });
                    
                    score += 10;
                    
                    elves.splice(j, 1);
                    bullets.splice(i, 1);
                    bulletRemoved = true;
                    break;
                }
        
        }
    }
}

    // elves spawn
    if (frameCount % 120 === 0) {
        let baseMin = 1;
        let baseMax = 3;
        let extra = floor(frameCount / 600);
    let spawnCount = int(random(baseMin + extra, baseMax + extra)); // 1 - 3 elves; int converts value to an integer
    for (let i = 0; i < spawnCount; i++) {
        elves.push(new Elf());
    }
}

    for (let i = elves.length - 1; i >= 0; i--) {
        elves[i].move();
        elves[i].draw();

     // CHECK GAME OVER
    if (collisionElfSanta(elves[i], santa)) {
        santa.health -= 20;
        elves.splice(i, 1);
        if (santa.health <= 0) {
            gameOver = true;
        }
    }
    }

    // elf explosion
   imageMode(CENTER);
    for (let i = 0; i < explosions.length; i++) {
        image(explosion, explosions[i].x, explosions[i].y, 100, 100); 
        explosions[i].timer--;
        if (explosions[i].timer <= 0) {
            explosions.splice(i, 1);
        }
    }
}

function keyPressed() {
    if (keyCode === ENTER) {
        bullets.push(new Bullet(santa.x + santa.width / 2, santa.y));
    }
}
/**
 * @ number 
 */

function collision(bullet, elf) {
    if (bullet.x >= elf.x - elf.width / 2  
        && bullet.x <= elf.x + elf.width / 2 
        && bullet.y >= elf.y - elf.height / 2 
        && bullet.y <= elf.y + elf.height / 2) {
            return true;
        } else {return false};
    }

function collisionElfSanta(elf, santa) {
    return !(santa.x + santa.width / 2 < elf.x - elf.width / 3 ||
        santa.x - santa.width / 2 > elf.x + elf.width / 3 ||
        santa.y + santa.height / 2 < elf.y - elf.height / 3 ||
        santa.y - santa.height / 2 > elf.y + elf.height / 3
    );
}

function drawScore() {
    fill(255, 0, 0);
    textSize(30);
    textFont(scoreFont);
    text("Score: " + score, 10, 40);
}