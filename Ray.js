class Ray{
    constructor(pos, dir){
        this.pos = pos;
        this.dir = dir;
        this.isColliding = false;
        this.reflection = createVector();
        this.hitPoint = createVector();
        this.rayLength = 0;
        this.hitId = " ";
    }

    lookAt(x, y){
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;
        this.dir.normalize();
    }

    draw(){
        stroke(0);
        push();
        translate(this.pos.x, this.pos.y);
        line(0, 0, this.dir.x * 10, this.dir.y * 10);
        pop();
    }

    calculateReflection(normals, pt){
        let angleI;
        let angleR;

        //draw a line from the ray origin point to the hitpoint
        line(this.pos.x, this.pos.y, pt.x, pt.y);

        
        this.rayLength = dist(this.pos.x, this.pos.y, pt.x, pt.y);
        
        push();
        translate(pt.x, pt.y);
        rotate(this.dir.heading());
        let arrowSize = 7;
        fill("black");
        triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
        pop();
        
        let v = createVector();
        v = this.dir.copy();
        
        let n1 = createVector();
        let n2 = createVector();
        let selectedNormal = createVector();
        p5.Vector.normalize(normals[0], n1)
        p5.Vector.normalize(normals[1], n2)

        //This doesn't work perfectly quite yet
        //get angle from incidence/reflection to the closest surface normal.
        if(abs(v.angleBetween(n1)) < abs(v.angleBetween(n2))){
            angleI = abs(v.angleBetween(n1));
            selectedNormal = n1;
        }else{
            angleI = abs(v.angleBetween(n2));
            selectedNormal = n2;
        }

        let reflection = v.reflect(n1);

        if (abs(reflection.angleBetween(n1)) < abs(reflection.angleBetween(n2))){
            angleR = abs(reflection.angleBetween(n1));
            selectedNormal = n1;
        }else{
            angleR = abs(reflection.angleBetween(n2));
            selectedNormal = n2;
        }
        push();
        // stroke(255,0,0);
        translate(pt.x, pt.y);

        //display angles of incidence and reflection in degrees

        //INCIDENCE
        textSize(16);
        text("Angle of Incidence: " + degrees(angleI).toPrecision(4), 10, 10);
        
        
        //REFLECTION 
        text("Angle of Reflection: " + degrees(angleI).toPrecision(4), 10, 30);
        text("Ray length: " + this.rayLength.toPrecision(4), 10, 50);
        pop();
        
        this.hitPoint = pt;
        this.reflection = reflection;

        //We create a new ray from the reflection, with the hitpoint
        //as its origin point and the reflection vector as a direction.
        let bounceRay = new Ray(this.hitPoint, this.reflection);

        return bounceRay;
    }


    cast(wall){
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;
        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if(den == 0){
            return;
        }
        const t =  ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

        if(t > 0 && t < 1 && u > 0){
            this.hitId = wall.id;
            const pt = createVector();
            pt.x = x1 + t * (x2 - x1);
            pt.y = y1 + t * (y2 - y1);
            let bounceRay = this.calculateReflection(wall.normals, pt);
            return bounceRay;
        }else{
            return;
        }
    }
}
