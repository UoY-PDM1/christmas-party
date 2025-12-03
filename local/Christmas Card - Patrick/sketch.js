let Santa
let House1
let House2
let House3
let gameover = false
let score = 0
let goodHouse
let badHouse
let clickHouse
let present
let cloud1
let cloud2
let cloud3
let Cloud1
let Cloud2
let Cloud3
let cloudcheck = false
let gameFont
let tree
let gamebg
let bgY = 0
let night
let start = true
let main  =false
let snowman
let Snowy
let tree1
let tree2
let globalspeed = 5
let startmusic
let mainmusic
let endmusic
let goodsfx
let badsfx
let startsfx


function preload(){
    goodHouse = loadImage("assets/pixil-frame-0 (12).png")
    badHouse = loadImage("assets/pixil-frame-0 (11).png")
    clickHouse = loadImage("assets/pixil-frame-0 (8).png")
    present = loadImage("assets/pixil-frame-0 (4).png")
    cloud1 = loadImage("assets/pixil-frame-0 (11) copy.png")
    cloud2 = loadImage("assets/pixil-frame-0 (12) copy.png")
    cloud3 = loadImage("assets/pixil-frame-0 (13).png")
    gameFont = loadFont("assets/Silkscreen-Regular.ttf")
    tree = loadImage("assets/pixil-frame-0(35).png")
    night = loadImage("assets/pixil-frame-0(37).png")
    snowman = loadImage("assets/pixil-frame-0(44).png")
    startmusic = loadSound("assets/RushJet1 - Carols of the 2a03 - 01 One Small Child.mp3")
    mainmusic = loadSound("assets/RushJet1 - Carols of the 2a03 - 08 Christmas Medley.mp3")
    endmusic = loadSound("assets/Lose Life - Kirby_'s Dream Land (128kbps).mp3")
    goodsfx = loadSound("assets/pickup_lucky_02.wav")
    badsfx = loadSound("assets/07 - MegamanDamage.wav")
    startsfx = loadSound("assets/26 - BonusBall.wav")
}
class Player{
    x
    y

    constructor(x,y){
        this.x = x
        this.y = y
    }
    moveX(x){
        this.x += x
    }
    moveY(y){
        this.y += y
    }
    draw(){
        fill(color(255,0,0))
        square(this.x,this.y,50)
    }

}

class House{
    x
    startX
    y
    good
    clicked
    speed
    presentSize

    constructor(x){
        this.startX = x
        this.x = this.startX + random(-20,20)
        this.y = random(-100,-500)
        let moral = floor(random(0,3))
        if(moral === 0){
            this.good = false
        }
        else{
            this.good = true
        }
        this.clicked = false
        this.speed = 5
        this.presentSize = 0
    }

    draw(){
        tint(255,255)
        if(this.good === true && this.clicked === true){
            imageMode(CORNER)
            image(clickHouse,this.x,this.y,80,80)
            imageMode(CENTER)
            image(present,this.x+40,this.y+40,this.presentSize,this.presentSize)
        }
        else if(this.good === false && this.clicked === true){
            imageMode(CORNER)
            image(badHouse,this.x,this.y,80,80)
            imageMode(CENTER)
            image(present,this.x+40,this.y+40,this.presentSize,this.presentSize)
        }
        else if(this.good === true){
            imageMode(CORNER)
            image(goodHouse,this.x,this.y,80,80)

        }
        else{
            imageMode(CORNER)
            image(badHouse,this.x,this.y,80,80)
        }
        if (this.presentSize > 5)
        {
            this.presentSize -= 5
        }
        else{
            this.presentSize = 0.1
            if(this.clicked=== true && this.good === false){
                gameover = true
                main = false
            }
        }

       

    }
    move(){
        this.y+=this.speed
        globalspeed = this.speed
        if(this.y>height){
            if(this.clicked === true || this.good === false){
                this.x = this.startX + random(-20,20)
                this.y = random(-100,-500)
                let moral = floor(random(0,3))
                if(moral === 0){
                    this.good = false
                }
                else{
                    this.good = true
                }
                this.clicked = false
                this.speed += 0.2
                this.presentSize = 0
            }
            else{
                main = false
                gameover = true
            }
            
        }
    }
    reset(){
        this.x = this.startX + random(-20,20)
        this.y = random(-100,-500)
        let moral = floor(random(0,3))
        if(moral === 0){
            this.good = false
        }
        else{
            this.good = true
        }
        this.clicked = false
        this.speed = 5
    }

    mouseCheck(){
        if(mouseX > this.x && mouseX < this.x+100 && mouseY > this.y && mouseY < this.y+100)
        {
            if(this.clicked === false){
                if(this.good === true){
                    this.clicked = true
                    score += 10
                    this.presentSize = 100
                    goodsfx.play()
                }
                else{
                    //gameover = true
                    this.clicked = true
                    this.presentSize = 100
                    //main = false
                    badsfx.play()
                }
            }
        }
    }
}

class Cloud{
    x
    y
    cloudX
    cloudY
    speed
    cloudRandom
    constructor(){
        this.x = floor(random(20,480))
        this.y = floor(random(-100,-500))
        this.cloudRandom = floor(random(0,3))
        this.speed = floor(random(2,6))
    }

    draw(){
        tint(255,128)
        if(this.cloudRandom === 0){
            imageMode(CORNER)
            image(cloud1,this.x,this.y,200,200)
        }
        else if(this.cloudRandom === 1){
            imageMode(CORNER)
            image(cloud2,this.x,this.y,200,200)
        }
        else if(this.cloudRandom === 2){
            imageMode(CORNER)
            image(cloud3,this.x,this.y,200,200)
        }
        
    }
    move(){

        this.y+=this.speed
        if(this.y>height){
            this.x = floor(random(20,480))
            this.y = floor(random(-100,-500))
            this.cloudRandom = floor(random(0,3))
            this.speed = floor(random(2,6))
        }
    }
    reset(){
        this.x = floor(random(20,480))
        this.y = floor(random(-100,-500))
        this.cloudRandom = floor(random(0,3))
        this.speed = floor(random(2,6))
    }
}

class BorderTree{
    x
    y
    currentX
    currentY
    constructor(x,y){
        this.x = x
        this.y = y
    }
    draw(){
        tint(255,255)
        image(tree,this.x,this.y)
    }
    move(){
        this.y+=10
        if(this.y>height){
            this.y = floor(random(0,-1000))
        }
    }
    reset(){
        this.y = floor(random(0,-1000))
    }
}

class Snowman{
    x
    y
    currentX
    currentY
    constructor(){
        this.x = floor(random(20,480))
        this.y = floor(random(-100,-500))
    }
    draw(){
        tint(255,255)
        image(snowman,this.x,this.y,50,50)
    }
    move(){
        this.y+=globalspeed
        if(this.y>height){
            this.x = floor(random(20,480))
            this.y = floor(random(-100,-500))
        }
    }
    reset(){
        this.x = floor(random(20,480))
        this.y = floor(random(-100,-500))
    }
}

class Tree{
    x
    y
    currentX
    currentY
    constructor(){
        this.x = floor(random(40,380))
        this.y = floor(random(-100,-500))
    }
    draw(){
        tint(255,255)
        image(tree,this.x,this.y,80,80)
    }
    move(){
        this.y+=globalspeed
        if(this.y>height){
            this.x = floor(random(40,380))
            this.y = floor(random(-100,-500))
        }
    }
    reset(){
        this.x = floor(random(40,380))
        this.y = floor(random(-100,-500))
    }
}


function setup(){
    createCanvas(500,500)
     Santa = new Player(250,400)
     House1 = new House(40)
     House2 = new House(200)
     House3 = new House(380)
     Cloud1 = new Cloud()
     Cloud2 = new Cloud()
     Cloud3 = new Cloud()
     Border1 = new BorderTree(-55,0)
     Border2 = new BorderTree(450,0)
     Snowy = new Snowman()
     tree1 = new Tree()
     tree2 = new Tree()
     mainmusic.play()
     mainmusic.loop()
}

function draw(){
    if(start === true){
        background(0,128,0)
        fill(0)
        textSize(45)
        textFont(gameFont )
        text("Present Dropper!",5,100)
        textSize(40)
        fill(255)
        text("Click on the",80,200)
        text("good houses to",50,250)
        textSize(35)
        text("deliver presents",50,300)
        fill(128,0,0)
        text("...But don't deliver to",5,350)
        text("the naughty ones!",35,400)
        fill(0)
        text("Press any key!",70,480)

    }
    else if(main === true){
        background(255)
        Snowy.draw()
        House1.draw()
        House2.draw()
        House3.draw()
        Cloud1.draw()
        Cloud2.draw()
        Cloud3.draw()
        Border1.draw()
        Border2.draw()
        tree1.draw()
        tree2.draw()
        tint(255,128)
        image(night,0,0,width,height)
        House1.move()
        House2.move()
        House3.move()
        tree1.move()
        tree2.move()
        Snowy.move()
        Cloud1.move()
        Cloud2.move()
        Cloud3.move()
        Border1.move()
        Border2.move()
    
    }
     
    else{
        //background(0)
        tint(255,8)
        image(night,0,0,width,height)
        fill(0)
        textSize(50)
        textFont(gameFont )
        text("Game Over!",80,150)
        let message = "Score: "+ score
        text(message,100,250)
        text("Press any key!",0,350)
    }

}

function mousePressed(){
    if(!gameover){  
        House1.mouseCheck()
        House2.mouseCheck()
        House3.mouseCheck()
    }

}

function keyTyped(){
     if(start || gameover){
        start = false
        main = true
        gameover = false
        House1.reset()
        House2.reset()
        House3.reset()
        Cloud1.reset()
        Cloud2.reset()
        Cloud3.reset()
        Border1.reset()
        Border2.reset()
        Snowy.reset()
        tree1.reset()
        tree2.reset()
        startsfx.play()
        startsfx.setVolume(1)
        score = 0
        
    }
}

function drawBorder1(){
    let treeX = 20
    let treeY = 0
    while (!gameover){
        image(tree,treeX,treeY)
        treeY +=30
        if(treeY > height){
            treeY = 0
        }
    }
}

