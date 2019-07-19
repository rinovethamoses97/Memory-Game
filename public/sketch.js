let size=50;
let rows=4;
let cols=4;
let boxes=[];
let images=[];
let count;
let doorImage;
function preload(){
    for(let i=0;i<8;i++)
        images.push(loadImage("./musicInstruments/image"+(i+1)+".jpg"));
    doorImage=loadImage("door.png");
}
function setup(){
    createCanvas(300,300,WEBGL);
    background(0);
    angleMode(DEGREES);
    let options=[0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];
    let gapY=20;
    for(let i=0;i<rows;i++){
        let gapX=20;
        for(let j=0;j<cols;j++){
            let index=floor(random(options.length));
            let img=images[options[index]];
            let imgId=options[index];
            options.splice(index,1);
            boxes.push(new Box((j*size)+gapX,(i*size)+gapY,size,img,imgId));
            gapX+=20;
        }
        gapY+=20;
    }
}
function draw(){
    translate(-width/2,-height/2);
    background(0);
    count=0;
    for(let i in boxes){
        boxes[i].update(boxes);
        boxes[i].show();
    }
    for(let i in boxes){
        if(!boxes[i].completed && boxes[i].revealed){
            count++;
        } 
    }
    if(count==2){
        setTimeout(function(){
            for(let i in boxes){
                if(!boxes[i].completed && boxes[i].revealed){
                    boxes[i].revealed=false;
                }   
            }
        },100)
    }
    if(winCheck()){
        alert("Won!!!");
        noLoop();
    }
}
function winCheck(){
    for(let i in boxes){
        if(!boxes[i].completed){
            return false;
        }
    }
    return true;
}
function mousePressed(){
    for(let i in boxes){
        if(boxes[i].isMouseIn(mouseX,mouseY) && !boxes[i].revealed){
            boxes[i].rotate=true;
            return;
        }
    }
}