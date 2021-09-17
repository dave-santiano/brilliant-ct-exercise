class Photon{
    constructor(pos, boundaries){
        this.pos = pos;
        this.dir = createVector(1, 1);
        this.boundaries = boundaries;
        this.reflections = 0;
        this.maxReflections = 24;
        this.rays = [];
        this.rays.push(new Ray(this.pos, this.dir));
    }

    
    lookAt(x, y){
        if(this.rays[0] != undefined){
            this.rays[0].lookAt(x, y);
        }

    }

    drawRays(){
        for(let i = 0; i < this.rays.length; i++){
            this.rays[i].draw();
        }
    }

    updateRays(){
        for(let i = 0; i < this.rays.length; i++){
            this.rays[0].pos = this.pos;
            let closest = null;
            if(i > 0){
                this.rays[i].dir = this.rays[i - 1].reflection;
                this.rays[i].pos = this.rays[i - 1].hitPoint;
            }
            for(let j = 0; j < this.boundaries.length; j++){
                let record = Infinity;
                
                if(this.rays[i].cast(this.boundaries[j])){
                    let bounceRay = this.rays[i].cast(this.boundaries[j]);

                    const d = p5.Vector.dist(this.rays[i].cast(this.boundaries[j]).pos, this.rays[i].cast(this.boundaries[j]).hitPoint);

                    if(d < record){
                        record = d;
                        closest = bounceRay;
                    }


                    // this.reflections++;
                    // break;
                }
            }
            if(this.rays.length < this.maxReflections){
                this.rays.push(closest);
            }
        }
        //Cleanup if any rays are not colliding
        for(let i = 0; i < this.rays.length; i++){
            if(i === 0){
                this.rays.length = 1;
            }
            if(i > 0 && this.rays[i].isColliding === false){
                this.rays.pop();
            }
        }
    }
}