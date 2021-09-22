class Objective{
    constructor(x1, y1, x2, y2){
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);
        let dx = this.b.x - this.a.x;
        let dy = this.b.y - this.a.y;

        this.midPoint = createVector((x1 + x2) / 2, (y1 + y2) / 2);
        this.imgWidth = dist(this.a.x, this.a.y, this.b.x, this.b.y);
        this.img = loadImage('assets/objective-2.png');

        this.id = "Objective";

        let dxInverse = dx * -1;
        this.normal1 = createVector(dy, dxInverse);
        
        let dyInverse = dy * -1;
        this.normal2 = createVector(dyInverse, dx);
        this.normals = [this.normal1, this.normal2];

    }

    draw(){
        stroke(0);
        push();
        imageMode(CENTER);
        
        line(this.a.x, this.a.y, this.b.x, this.b.y);
        image(this.img, this.midPoint.x, this.midPoint.y,  this.imgWidth, this.imgWidth);
        pop();
    }
}
