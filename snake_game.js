let gameLoop;
let eatSound;
let deadSound;
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

window.onload=function() {
    canv=document.getElementById("gc");
    ctx=canv.getContext("2d");
    document.addEventListener("keydown",keyPush);
    gameLoop = setInterval(game,speed);
    console.log(level)
}
// lol = 0
function init(){
    level = 1
    point = 0
    px=py=5;
    gs=tc=22;
    ax=ay=15;
    xv=yv=0;
    trail=[];
    tail = 5;
    speed = 100; 

}
init()

function game() {
    eatSound = new sound("bounce.mp3");
    deadSound = new sound("dead.mp3")
    if (point > 3){
        level = Math.floor(point/3)
       
    }
    px+=xv;
    py+=yv;
    if(px<0) {
        px= tc-1;
    }
    if(px>tc-1) {
        px= 0;
    }
    if(py<0) {
        py= tc-1;
    }
    if(py>tc-1) {
        py= 0;
    }
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canv.width,canv.height);
 
    ctx.fillStyle="purple";
    for(var i=0;i<trail.length;i++) {
        ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);
        if(trail[i].x==px && trail[i].y==py) {
            deadSound.stop();
            deadSound.play();
           
            init()
        }
    }
    trail.push({x:px,y:py});
    while(trail.length>tail) {
    trail.shift();
    }
 
    if(ax==px && ay==py) {
        eatSound.stop();
        eatSound.play();
        
        point ++;
        tail++;

        if(point % 3 == 1){
            clearInterval(gameLoop)
            speed -= 5;
            gameLoop = setInterval(game,speed);
        }
        ax=Math.floor(Math.random()*tc);
        ay=Math.floor(Math.random()*tc);
        for (var index = 0; index < trail.length; index++) {
            if (trail[index].x==ax && trail[index].y==ay) {
                ax=Math.floor(Math.random()*tc);
                ay=Math.floor(Math.random()*tc);
            }
        }
    }
    ctx.fillStyle="red";
    ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2);
    document.getElementById("score").innerHTML = "Point:"+ point
    document.getElementById("level").innerHTML = "Level:"+ level
    
    
}
function keyPush(evt) {
    switch(evt.keyCode) {
        case 37:
            if (xv != 1){
                xv=-1;yv=0;
            }
            break;
        case 38:
            if (yv!=1) {
                xv=0;yv=-1;
            }
            break;
        case 39:
            if (xv!=-1) {
                xv=1;yv=0;
            }
            break;
        case 40:
            if (yv!=-1) {
                xv=0;yv=1;
            }
            break;
    
    }
    
}
console.log(trail)