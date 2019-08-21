let gameLoop;
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
    speed = 100
}
init()

function game() {
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
            tail = 3;
            point = 0;
            level = 1;
            die = true
            init()
        }
    }
    trail.push({x:px,y:py});
    while(trail.length>tail) {
    trail.shift();
    }
 
    if(ax==px && ay==py) {
        point ++;
        tail++;

        if(point % 3 == 1){
            clearInterval(gameLoop)
            speed -= 5;
            gameLoop = setInterval(game,speed);
        }
        ax=Math.floor(Math.random()*tc);
        ay=Math.floor(Math.random()*tc);
    }
    ctx.fillStyle="red";
    ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2);
    document.getElementById("score").innerHTML = "Point:"+ point
    document.getElementById("level").innerHTML = "Level:"+ level
    // document.getElementById("status").innerHTML = Status + "Playing"
    
    
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