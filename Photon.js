class Photon{
    constructor(pos, boundaries){
        this.pos = pos;
        this.dir = createVector(1, 1);
        this.boundaries = boundaries;
        this.reflections = 0;
        this.maxReflections = 24;
        this.rays = [];
        this.rays.push(new Ray(this.pos, this.dir));
        this.eyeImg = loadImage('assets/eye.png');
    }

    
    lookAt(x, y){
        if(this.rays[0] != undefined){
            this.rays[0].lookAt(x, y);
        }

    }

    drawRays(){
        push();
        imageMode(CENTER);
        image(this.eyeImg, this.pos.x, this.pos.y,  80, 80);
        for(let i = 0; i < this.rays.length; i++){
            this.rays[i].draw();
        }
        pop();
    }

    updateRays(){
        this.rays[0].pos = this.pos;
        for(let i = 0; i < this.rays.length; i++){
            let closest = null;
            let record = Infinity;

            

            //this draws reflections, maybe individual rays should handle their own drawing?
            if(i > 0){
                this.rays[i].dir = this.rays[i - 1].reflection;
                this.rays[i].pos = this.rays[i - 1].hitPoint;
                stroke(0);
            }
            if(this.rays[i].cast(this.boundaries[2])){
                let bounceRay = this.rays[i].cast(this.boundaries[2]);
                this.rays[i].isColliding = true;
                this.rays.push(bounceRay);
                break;
            }


            for(let j = 0; j < this.boundaries.length; j++){
                if(this.rays[i].cast(this.boundaries[j])){
                    let bounceRay = this.rays[i].cast(this.boundaries[j]);
                    
                    const d = p5.Vector.dist(this.rays[i].pos, bounceRay.pos);

                    if(d < record){
                        record = d;
                        closest = bounceRay;
                    }

                    this.rays[i].isColliding = true;
                }
            }
            if(this.rays.length < this.maxReflections && closest !== null ){
                this.rays.push(closest);
            }
        }
        //Cleanup if any rays are not colliding
        for(let i = 0; i < this.rays.length; i++){
            if(i > 0 && this.rays[i].isColliding === false){
                this.rays.splice(i, 1);
            }
        }
        for(let i = 1; i < this.rays.length; i++){
            this.rays[i].isColliding = false;
            
        }
    }
}