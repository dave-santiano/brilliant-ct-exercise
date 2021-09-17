class Ray{
    constructor(pos, dir){
        this.pos = pos;
        this.dir = dir;
        this.isColliding = false;
        this.reflection = createVector();
        this.hitPoint = createVector();
    }

    lookAt(x, y){
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;
        this.dir.normalize();
    }

    draw(){
        stroke(255);
        push();
        translate(this.pos.x, this.pos.y);
        line(0, 0, this.dir.x * 10, this.dir.y * 10);
        pop();
    }

    calculateReflection(normals, pt){
        let angleI;
        let angleR;

        stroke(255);
        line(this.pos.x, this.pos.y, pt.x, pt.y);
  
        
        let v = createVector();
        v = this.dir.copy();
        
        let n1 = createVector();
        let n2 = createVector();
        let selectedNormal = createVector();
        p5.Vector.normalize(normals[0], n1)
        p5.Vector.normalize(normals[1], n2)


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
            // console.log("N1");
        }else{
            angleR = abs(reflection.angleBetween(n2));
            selectedNormal = n2;
            // console.log("N2");
        }
        push();
        stroke(255,0,0);
        translate(pt.x, pt.y);

        //display angles of incidence and reflection in degrees

        //INCIDENCE
        textSize(12);
        text("Ti: " + degrees(angleI), 10, 10);

        //REFLECTION 
        text("Tr: " + degrees(angleR), 10, 30);
        // line(0, 0, reflection.x * 1000, reflection.y * 1000);
        
        //NORMAL
        stroke(0,255,0);
        line(0,0, selectedNormal.x * 40, selectedNormal.y * 40);
        pop();
        
        this.reflection = reflection;
        this.hitPoint = pt;

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
            this.isColliding = true;

            if(wall.id === "Objective"){
                console.log("objective hit!");

            }else{
                
            }
            console.log(wall.id);

            const pt = createVector();
            pt.x = x1 + t * (x2 - x1);
            pt.y = y1 + t * (y2 - y1);
            let bounceRay = this.calculateReflection(wall.normals, pt);


            return bounceRay;
        }else{
            this.isColliding = false;
            return;
        }
    }
}
