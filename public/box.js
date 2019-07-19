class Box{
    constructor(x_,y_,size_,img_,imgId_){
        this.x=x_;
        this.y=y_;
        this.size=size_;
        this.angle=0;
        this.rotate=false;
        this.img=img_;
        this.imgId=imgId_;
        this.revealed=false;
        this.completed=false;
    }
    update(boxes){
        if(this.rotate){
            this.angle+=5;
            if(this.angle==180){
                this.revealed=true;
                this.rotate=false;
                this.angle=0;
                for(let i in boxes){
                    if(boxes[i]!=this){
                        if(!boxes[i].completed && this.imgId==boxes[i].imgId && boxes[i].revealed){
                            this.completed=true;
                            boxes[i].completed=true;
                            return;
                        }
                    }
                }
            }
        }
    }
    show(){
            push();
            translate(this.x+this.size/2,0);
            // displaying the axis about which the rectangle is rotated
            // stroke(255);
            // line(0,0,0,height);
            rotateY(this.angle);
            // stroke(255);
            // fill(255);
            if(this.revealed){
                image(this.img,-this.size/2,this.y,this.size,this.size);
            }
            else{
                image(doorImage,-this.size/2,this.y,this.size,this.size);
                // rect(-this.size/2,this.y,this.size,this.size);
            }
            pop()
    }
    isMouseIn(mouseX,mouseY){
        return (mouseX>=this.x && mouseX<=this.x+this.size && mouseY>=this.y && mouseY<=this.y+this.size);
    }
}