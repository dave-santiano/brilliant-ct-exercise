let startPoint;
let xPos = 0;
let yPos = 0;
let photon;
let boundary;
let boundaries = [];
var maxBounces = 8;
let gui;


function setup(){
    createCanvas(500, 500);
    startPoint = createVector(width/2, height/2);
    sliderRange(0, 1000,5);
    gui = createGui("Controls");
    gui.addGlobals("maxBounces");
    //make this better
    boundaries.push(new Wall(width/2 - 50, height/2 - 150, width/2 - 50, height/2));
    boundaries.push(new Wall(width/2 + 50, height/2 - 150, width/2 + 50, height/2));
    boundaries.push(new Objective(width/2 - 10, 100, width/2 + 10, 100));
    // boundaries.push(new Objective(width/2, 90, width/2, 110));
    photon = new Photon(startPoint, boundaries);
}


function draw(){
    background(0);
    photon.lookAt(mouseX, mouseY);
    photon.updateRays();
    photon.maxReflections = maxBounces;
    photon.drawRays();

    for(let i = 0; i < boundaries.length; i++){
        boundaries[i].draw();
    }
}

function mousePressed() {
    photon.pos = createVector(mouseX, mouseY);
}
  
function mouseDragged() {
    photon.rays[0].pos = createVector(mouseX, mouseY);
}

//TO-DO: Final ray stored in photon should check for a collision
//  with the object that in the 


