let startPoint;
let photon;
let boundaries = [];
let maxBounces = 16;
let objectiveImage;
let lineSegmentColors = ['red','green','blue'];
let wallHeight = 400;
let objectiveHalfWidth = 40;


function setup(){
    createCanvas(1680, 1000);
    objectiveImage = loadImage("assets/objective-2.png");
    startPoint = createVector(width/2, height/2);

    boundaries.push(new Wall(width/2 - 75, height/2 - wallHeight, width/2 - 75, height/2, "Left"));
    boundaries.push(new Wall(width/2 + 75, height/2 - wallHeight, width/2 + 75, height/2, "Right"));
    boundaries.push(new Objective(width/2 - objectiveHalfWidth, height/2 - wallHeight, width/2 + objectiveHalfWidth, height/2 - wallHeight));

    photon = new Photon(startPoint, boundaries);
}


function draw(){
    background(246);
    push();
    translate(0, 100);

    for(let i = 0; i < boundaries.length; i++){
        boundaries[i].draw();
    }
    photon.lookAt(mouseX, mouseY);
    photon.updateRays();
    photon.drawRays();
    photon.maxReflections = maxBounces;

    drawReflections();
    pop();
    drawKey();
    
}

function drawKey(){
    //Draw the key 
    fill("blue");
    rect(30, 30, 80, 50);
    textSize(18);
    text("Perceived travel path", 140, 60)
    fill("black");
    stroke(0);
    rect(30, 90, 80, 50);
    text("Actual travel path", 140, 120)
}


function drawReflections(){
    let overallLength = 0;
    let flip = 1;
    let xDisplacement = 0;
    if(photon.rays[0].hitId === "Left"){
        flip = -1;
    }else if(photon.rays[0].hitId === "Right"){
        flip = 1;
    }else{
        flip = 0;
    }

    //How "mirror rooms" are generated.
    for(let i = 0; i < photon.rays.length - 1; i++){
        overallLength += photon.rays[i].rayLength;
        if(i % 2 == 0){
            xDisplacement += 150;
        }
        
        push();
        
        translate(xDisplacement * flip, 0);
        stroke(0,0,255);
        tint(255, 126);
        line(width/2 - 75, height/2 - wallHeight, width/2 - 75, height/2);
        line(width/2 + 75, height/2 - wallHeight, width/2 + 75, height/2);
        imageMode(CENTER);
        image(objectiveImage, width/2, height/2 - wallHeight, objectiveHalfWidth*2, objectiveHalfWidth *2);
        pop();
        
        flip *= -1;
    }

    //Draw total distance traveled ray
    stroke(0, 0, 255);
    push();
    translate(photon.rays[0].pos.x, photon.rays[0].pos.y);
    line(0, 0, photon.rays[0].dir.x * overallLength, photon.rays[0].dir.y * overallLength);
    push();
    translate(photon.rays[0].dir.x * overallLength, photon.rays[0].dir.y * overallLength);
    text("Total ray length: "  + overallLength.toPrecision(5), 10, 30)

    //Draw arrow head
    rotate(photon.rays[0].dir.heading());
    let arrowSize = 7;
    fill("blue");
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    textSize(16);
    pop();
    pop();

}