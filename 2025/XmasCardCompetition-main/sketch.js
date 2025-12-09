let numSnow =100;
let snowX = [];
let snowY = [];
let snowSpeed =[];


let duck1, duck2, duck3;
let duckImages = [];
let currentDuck;

let duckX = 100;
let duckY = 650;


let currentFrame = 0;
let frameDelay= 10; //how fast the legs switch

let isWalking = false;
let movingLeft = false;
let movingRight = false;

//-------------------------Scene variables-----------------

let bg1;
let  gingerbreadman;
let showFood = true;


let fading = false;
let nextScene = 1; // which scene it fades INTO


let scene =0;
let scene0; //york minster
let scene1; //dark forest
let scene2; //uni campus
let scene3; //derwent xmas statue
let currentScene= scene0;

//-------------------------
//first (scene0) food 
let foodX = 325;
let foodY = 550;
let foodW = 100;
let foodH = 100;

//scene 1 food
let food1;
let food1X = 600;
let food1Y = 700;
let food1W = 50;
let food1H = 50;

//scene 2 food
let food2;
let food2X = 600;
let food2Y = 650;
let food2W = 60;
let food2H = 60;

let dialogue = [

//scene 0

  "Oh no! Long Boi is lost…It's nearly Christmas, and the students have missed him!",
  "It's cold and snowy… He must make it back on time! Press the left and right arrow keys to exercise his little legs  ",
  "Help Long Boi regain his energy by clicking on the food - to make it back to the University of York where he belongs!",
   "~Click this dialogue box when you have found the food item~",



//scene 1

  "You've made it! Long Boi has regained energy!",
  "But the snow has piled up, and it's getting darker ever since he left town on his way to Uni of York, making it harder to see his energy boost!",
  "Find the food item so that the road ahead is clearer!", //hide behind a tree
"~Click this dialogue box when you have found the food item~",


//scene 2

"Amazing!",
"Long boi was lost in the forest area far far away from home, but you've helped him recover!",
"He used your help to redirect himself to the Uni campus! ",
"We're so close to home!Just find the hidden bit of lunch a student has left  somewhere!",
"~Click this dialogue box when you have found the food item~",


//scene 3

"WE'VE MADE IT HOME! Whilst Long Boi was away, they made a statue of him because they missed him so much :(",
"Thank you for returning him home, just in time for the Festive Holiday!",
"Merry Christmas!"

];

let dialogueIndex = 0;
let showDialogue = true;

function preload() {

  duck1 = loadImage("assets/duck1still.png");
   duck2 = loadImage("assets/duck2.png");
    duck3 = loadImage("assets/duck3.png");
      bg1 =loadImage("assets/bg1.png"); // clouds, ground higher, tree green, w ornaments

  duckImages=[duck1, duck2, duck3];
  gingerbreadman = loadImage("assets/gingerbreadman.png");
  food1=loadImage("assets/food1.png");
  food2=loadImage("assets/food2.png");
  forest1 = loadImage("assets/forest1.png");
  uniwest = loadImage("assets/uniwest.png");
  derwentxmas = loadImage("assets/derwentxmas.png");  

    }



function setup() {

  createCanvas(700, 800);

  for(let i=0; i<numSnow; i++){
  snowX[i]=random(width)
  snowY[i]=random(-height,0)
  snowSpeed[i]=random(1,3);
  }
  noSmooth()
   textFont("Arial");
   currentDuck=duckImages[0]
}



function draw() {

          //scene setup

  background(22, 39, 117);
  imageMode(CENTER);
 if (fading) {
  clickedFood();   // fading function
} else {
  drawScene();     // og background
}
//so that bg doesnt overwrite everything
  image(currentDuck, duckX, duckY,150,150);
  

//Duck

updateWalkingStatus();
animateDuck();

//Dialogue

  if (showDialogue) {
   drawDialogueBox();

//Snow

  }
  for(let i=0; i<numSnow; i++){// forms a loop so the nsow is infinite
    fill(255)
    ellipse(snowX[i],snowY[i],6,6);
    snowY[i] += snowSpeed[i];
   if (snowY[i] >height){
  snowX[i]=random(width)
  snowY[i]=random(-20,0)
  snowSpeed[i]=random(1,3);

   }
  }
  
if (scene === 0 && showFood) {

  imageMode(CENTER);
  rectMode(CENTER);

  // Debug hitbox to see if they click within the area
  noFill();
  stroke(255, 0, 0);
  //rect(foodX, foodY, foodW, foodH);

  noStroke();

  // Draw the gingerbreadman
  image(gingerbreadman, foodX, foodY, foodW, foodH);
}
if (scene === 1 && showFood) {

    imageMode(CENTER);
  rectMode(CENTER);

  // Debug hitbox (optional)
  noFill();
  stroke(255, 0, 0);
  // rect(food1X, food1Y, food1W, food1H);

  noStroke();
  // Draw the food
  image(food1, food1X, food1Y, food1W, food1H);
        }
      
 if (scene === 2 && showFood) {

    imageMode(CENTER);
  rectMode(CENTER);

  // Debug hitbox (optional)
  noFill();
  stroke(255, 0, 0);
  // rect(food1X, food1Y, food1W, food1H);

  noStroke();
  // Draw the food
  image(food2, food2X, food2Y, food2W, food2H);
        }
    
}
  

function clickedFood() {

  // Pick the correct "from" and "to" images
  let fromImage;
  let toImage;

  if (scene === 0) {
    fromImage = bg1;
    toImage = forest1;
  } 
  else if (scene === 1) {
    fromImage = forest1;
    toImage = uniwest;
  } 
  else if (scene === 2) {
    fromImage = uniwest;
    toImage = derwentxmas;
  }

  // Draw the new scene fully
  image(toImage, width/2, height/2, 700, 800);

  // Fade out the old scene
  fromImage.loadPixels();
  for (let i = 3; i < fromImage.pixels.length; i += 4) {
    if (fromImage.pixels[i] > 0) {
      fromImage.pixels[i] -= 4;  // fade speed
    }
  }
  fromImage.updatePixels();

  // Draw the fading overlay
  image(fromImage, width/2, height/2, 700, 800);

  // When finished fading
  if (fromImage.pixels[3] <= 0) {
    fading = false;
    scene = nextScene;
    showFood = true;
  }
}


function clickedFood1() {

  // Scene we are fading INTO
  image(derwentxmas, width / 2, height / 2, 700, 800);
  forest1.loadPixels();
  for (let i = 3; i < forest1.pixels.length; i += 4) {
    if (forest1.pixels[i] > 0) {
      forest1.pixels[i]--;   // 
    }
  }

function clickedFood2() {
  newSceneImage = derwentxmas;  

    image(derwentxmas, width / 2, height / 2, 700, 800);
  forest1.loadPixels();
  for (let i = 3; i < forest1.pixels.length; i += 4) {
    if (forest1.pixels[i] > 0) 
      forest1.pixels[i]--;   {
                  // the image you are fading FROM
    }}}

  
  forest1.updatePixels();

  // Draw faded image ON TOP
  image(forest1, width / 2, height / 2, 700, 800);

  // ✅ When fully faded → lock into next scene
  if (forest1.pixels[3] <= 0) {
    fading = true;
    scene = nextScene;
    showFood = true;
    
  }
}

function animateDuck() {
  if (isWalking) {
    if (frameCount % frameDelay === 0) {
      currentFrame = currentFrame === 1 ? 2 : 1;
    }
    currentDuck = duckImages[currentFrame];
  } else {
    currentDuck = duckImages[0];  // index 0 is Duck1=> idle frame
  }
}

// --------- MOVEMENT ----------

function updateWalkingStatus() {//necessary for informing the code to change the frame to make it look like the ducks walking
  isWalking = movingLeft || movingRight;

}
function drawDialogueBox() {
  rectMode(CORNER);   // ✅ RESET from CENTER
  imageMode(CORNER);  

  fill(228, 228, 237);
  noStroke();
  rect(20, 730, width - 30, 55, 10);
  fill(0);
  textSize(18);
  textWrap(WORD);
  text(dialogue[dialogueIndex], 40, 740, width - 80);
  textSize(14);
  text("Click to continue…", 40, 795);

    }




function mousePressed(){
        
   if (
    showFood &&
    mouseX > foodX - foodW / 2 &&
    mouseX < foodX + foodW / 2 &&
    mouseY > foodY - foodH / 2 &&
    mouseY < foodY + foodH / 2
  ) {
    console.log("✅ GINGERBREADMAN CLICKED → FADE START");
    fading = true;
    showFood1 = true;
    nextScene = scene + 1;
    return; // STOP here so dialogue doesn't also trigger
  }
  if (
    scene === 1 &&
    showFood &&
    mouseX > food1X - food1W / 2 &&
    mouseX < food1X + food1W / 2 &&
    mouseY > food1Y - food1H / 2 &&
    mouseY < food1Y + food1H / 2
  ) {
    console.log("✅ SCENE 1 FOOD CLICKED");
    fading = true;
    showFood = false;
    nextScene = 2;
    return;
  }
  if (
  scene === 2 &&
  showFood &&
  mouseX > food2X - food2W / 2 &&
  mouseX < food2X + food2W / 2 &&
  mouseY > food2Y - food2H / 2 &&
  mouseY < food2Y + food2H / 2
) {
  console.log("✅ SCENE 2 FOOD CLICKED");
  fading = true;
  showFood = false;
  nextScene = 3;    
  return;
}

  // Dialogue box click detection
  let boxX = 20;
  let boxY = 730;
  let boxWidth = width - 30;
  let boxHeight = 55;

  if (
    mouseX > boxX && mouseX < boxX + boxWidth && 
    mouseY > boxY && mouseY < boxY + boxHeight
  ) {

    dialogueIndex++;

    if (dialogueIndex >= dialogue.length) {
      showDialogue = false;
    }
  }
}
    

function keyPressed() {

if (keyCode === LEFT_ARROW) {
    duckX -= 30;
  movingLeft = true;
  }
  if (keyCode === RIGHT_ARROW) {
    duckX += 30;
    movingRight = true;
  }

  updateWalkingStatus();    
}



// I have to define what happens when the Key is released in order to stop te animation cycle from continuing when not moving

function keyReleased() {
  if (keyCode === RIGHT_ARROW) {
    movingRight = false;
  }
  if (keyCode === LEFT_ARROW) {
    movingLeft = false;
  }
  updateWalkingStatus();    
}



function drawScene() { //needs boolean for the switching scenes

  if (scene === 0) {
    image(bg1, width/2, height/2, 700, 800);
  }
  else if (scene === 1) {
    image(forest1, width/2, height/2, 700, 800);
  }
  else if (scene === 2) {
    image(uniwest, width/2, height/2, 700, 800);
  }
  else if (scene === 3) {
    image(derwentxmas, width/2, height/2, 700, 800);

  }
}