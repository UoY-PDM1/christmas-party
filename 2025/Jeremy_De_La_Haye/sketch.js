let dropPoint;
let dropperPos =50;
let presents = [];
let snowParticles = []
let santaRight;
let santaLeft;
let currentSanta;
let elf;
let caughtCount = 0;
let lostCount = 0;
let caughtSound;
let lostSound;
let gameOver;
let gameStart;

function preload()
{
    santaRight = loadImage('./assets/santa1.png')
    santaLeft = loadImage('./assets/santa2.png')
    elf = loadImage('./assets/elf.png')
    caughtSound = loadSound('./assets/catch.mp3')
    lostSound = loadSound('./assets/drop.mp3')
}

function setup()
{
    createCanvas(400,750)
    dropPoint = random(0,width);
    gameStart = true;
}

function draw()
{
    background(0,140,255)
    drawBackground();
    if(gameStart === true )
    {
        starterScreen();
    }
    if (gameStart === false)
    {
        drawSnow();
        drawCatcher();
        drawDropper();
        dropPresents(); 
        showCounters();
        
    }  
    gameOverCondition();  
}

function drawCatcher()
{
    let catcherX;
    let size = 50;
    if (mouseX <= 0)
    {
        catcherX = 0
    }
    if (mouseX >= width)
    {
        catcherX = width - size/2
    }
    else
    {
        catcherX = mouseX
    }
    rectMode(CENTER)
    image(elf,catcherX,700,100,100)
    
}

function drawDropper()
{
    if (dropperPos > dropPoint)
    {
        dropperPos -= 5
        currentSanta = santaLeft;
    }
    if (dropperPos < dropPoint)
    {
        dropperPos += 5
        currentSanta = santaRight;
    }
    if (dropperPos <= dropPoint + 10 && dropperPos >= dropPoint -10)
    {
        let present = 
        {
            x: dropPoint,
            y:50,
            s:35,
            done: false,
            c1: random(255),
            c2: random(255),
            c3: random(255)
        }
        presents.push(present)
        dropPoint = random(width)  
    }
    imageMode(CENTER)
    image(currentSanta,dropperPos,50,160,100)
}           

function dropPresents()
{
    let offset = 50;
    for(let i = 0; i < presents.length;i++)
    {
        if (presents[i].done === false)
        {
            drawPresent(presents[i].x,presents[i].y,presents[i].s,presents[i].c1,presents[i].c2,presents[i].c3)
            presents[i].y += 10;
            if (presents[i].y >= height)
            {
                lostPresent();
                presents[i].done = true
            }
            if (
            presents[i].x >= mouseX - 50 &&
            presents[i].x <= mouseX + 50 &&
            presents[i].y >= 650 &&
            presents[i].y <= 750)                          
            {
                caughtPresent();
                presents[i].done = true;
            }
        }
    }
}

function caughtPresent()
{
    caughtCount++;
    caughtSound.play();
}

function lostPresent()
{
    lostCount++;
    lostSound.play()
}

function drawPresent(x,y,s,c1,c2,c3)
{
    
    rectMode(CENTER)
    fill(c1,c2,c3)
    square(x,y,s)
    //bows
    circle(x-s/7,y-s/1.6,s/3)
    circle(x+s/6,y-s/1.6,s/3)

    strokeWeight((s/10)-1)
    //line
    line(x-(s/2), y,x+(s/2),y)
    line(x,y-(s/2),x,y+(s/2))
}

function drawBackground()
{
    noStroke();
    fill(255)
    circle(width/3.8,height/1.1,250)
    circle(width/2 + 80,height/1.1,300)
    fill(150,75,0)
    square(270,520,40)
    triangle(250,500,270,470,290,500)
    fill(0)
    rectMode(CENTER)
    rect(270,530,10,20)
    
}

function starterScreen()
{
    textSize(20);
    fill(0);
    textAlign(CENTER,CENTER)
    text('catch 50 presents to win!',width/2,350)
    image(elf,width/2,600,300,300)
    startButton();
}

function mousePressed()
{
    if (gameStart === true)
    {
        if (mouseX >= 100 && mouseX <= 300 && mouseY >= 370 && mouseY <= 430)
        {
           
            gameStart = false;
        }
    }
    if (gameStart === null)
    {
        if (mouseX >= 100 && mouseX <= 300 && mouseY >= 370 && mouseY <= 430)
        {
           
            gameStart = false;
        }
    }
}

function gameOverCondition()
{
    if (caughtCount >= 50)
    {
        gameStart = true;
        lostCount = 0;
        caughtCount = 0;
    }
    if (lostCount >= 15)
    {
        gameStart = true;
        lostCount = 0;
        caughtCount = 0;
    }
}

function startButton()
{
    rectMode(CENTER)
    fill(255)
    rect(width/2,400,120,60)
    fill(0)
    text('play',width/2,400)
    
}

function showCounters()
{
    fill(255,0,0);
    textSize(20);

    text(`caught: ${caughtCount}`, 50, 100);
    text(`lost: ${lostCount}`, 35, 130);

}

function drawSnow()
{
    
    let snow = 
    {
        x: random(0,400),
        y: random(0,10),
        s: random(10,20)
    }
    snowParticles.push(snow)

    for (let i = 0; i < snowParticles.length; i++)
    {
        fill(255)
        snowParticles[i].x += random(-1,1)
        snowParticles[i].y += 3
        circle(snowParticles[i].x,snowParticles[i].y,snowParticles[i].s)
    }
}


//add start 
//add end 
//add backing track
//add counters 

