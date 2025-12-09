// before you read this, yes i am aware that a camera function exists in p5.js. i only found out after basically completing this.
// this took forever.

let layers = [] 

// technically the code runs without this and idk why but i left it in anyway
let bgImg;
let fore1;
let fore2;
let fore3;
let fore4;
let fore5;

// loading assets
function preload() {
    bgImg = loadImage("./assets/back.png");
    console.error('back.png failed to load')
    fore1 = loadImage("./assets/fore1.png");
    fore2 = loadImage("./assets/fore2.png");
    fore3 = loadImage("./assets/fore3.png");
    fore4 = loadImage("./assets/fore4.png");
    fore5 = loadImage("./assets/fore5.png");
}

// sets up canvas and rendering mode of assets to center instead of corner.
// pushes each image onto the drawing stack using the layer class.
function setup() {
    createCanvas(800, 800);
    rectMode(CENTER);
    imageMode(CENTER);

    layers.push(new layer(bgImg, width, 0, width, width, 0)); 
    layers.push(new layer(fore1, width + 10 , 0.5, width + 5, width + 15, 0.01));      
    layers.push(new layer(fore2, width + 125, 2.5, width + 100, width + 150, 0.05));
    layers.push(new layer(fore3, width + 175, 7.5, width + 100, width + 250, 0.15));
    layers.push(new layer(fore4, width + 450, 15, width + 300, width + 600, 0.3));
    layers.push(new layer(fore5, width + 800, 30, width + 500, width + 1100, 0.6));
}

// draws each frame, loops through the layers list and outputs them ontop of eachother.
// mouse positions used as parameters
function draw() {
    background(0)
    for (let layer of layers) {
        layer.draw(mouseX, mouseY);
    }

}


// detects when the mouse wheel is scrolled and goes to the scroll method in the layer classes
function mouseWheel(event) {
    for (let layer of layers) {
        layer.handleScroll(event);
    }
}

// takes a pre-loaded image and uses calculations to offset and resize them on the canvas.
class layer {
    image;
    imageSize;
    resizeSpeed;
    minSize;
    maxSize;
    parralax;

    constructor(image, imageSize, resizeSpeed, minSize, maxSize, parralax) {
        this.image = image;
        this. imageSize = imageSize;
        this.resizeSpeed = resizeSpeed;
        this.minSize = minSize;
        this.maxSize = maxSize;
        this.parralax = parralax;
    }

    // where the calculation lives
    // also checks if the mouse is inside of the canvas, if not return to 0
    // did this bc if you go to far you see the edges of the images and it looks weird, took way too long to fix.
    draw(Xpos, Ypos) {
        if (0 < Xpos && Xpos < width && 0 < Ypos && Ypos < height) {
            let offsetX = (Xpos - width / 2) * this.parralax
            let offsetY = (Ypos - height / 2) * this.parralax

            image(this.image, width / 2 + offsetX, height / 2 + offsetY, this.imageSize, this.imageSize)
        } else {
            image(this.image, width / 2, height / 2, this.imageSize, this.imageSize)
        }

    }

    // discovered this functionality in the p5.js documentation. up means positive down means negative. very cool
    handleScroll(event) {
        if (event.delta > 0) {
            this.imageSize -= this.resizeSpeed;
        } else {
            this.imageSize += this.resizeSpeed;
        }

        this.imageSize = constrain(this.imageSize, this.minSize, this.maxSize);
    }
}

