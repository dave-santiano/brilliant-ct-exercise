class Wall{
    constructor(x1, y1, x2, y2, id){
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);
        let dx = this.b.x - this.a.x;
        let dy = this.b.y - this.a.y;
        this.id = id;

        let dxInverse = dx * -1;
        this.normal1 = createVector(dy, dxInverse);
        
        let dyInverse = dy * -1;
        this.normal2 = createVector(dyInverse, dx);
        this.normals = [this.normal1, this.normal2];
        
    }

    draw(){
        stroke(0);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
        //draw normals for debugging
        // line(this.a.x, this.a.y, this.normal.x * 1000, this.normal.y * 1000);
        
    }
}
