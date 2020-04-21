var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

imgBoat = new Image();
imgBoat.src = "ikony/lod.png";
imgBoat.addEventListener("load", init, false);

imgStone = new Image();
imgStone.src = "ikony/skala.png";

imgMiniDrevo = new Image();
imgMiniDrevo.src = "ikony/mini drevo.png";

imgDrevo = new Image();
imgDrevo.src = "ikony/drevo.png";

var requestAnimFrame =
        window.requestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000/60);
        };
var boatX=135;
var boatY=425;
//var posun=125;
//var zivoty = 3;

document.onkeydown = function() {
    var a = event.keyCode;
    switch(a) {
        case 37: if(boatX != 10) boatX -= 125; break;
        case 39: if(boatX != 385) boatX += 125; break; 
    } 
}

function init(){
    requestAnimFrame( update);
}

var stoneX, miniDrevoX, drevoX, poloha= new Array(5, 130, 255, 380), x;
var stoneY = -100;
var miniDrevoY = -100;
var drevoY = -100;
miniDrevoX = Math.round(Math.random()*3);
stoneX = Math.round(Math.random()*3);
drevoX = Math.round(Math.random()*2);


function update(){
    context.clearRect(0, 0, 500, 550);
    
    stoneY += 1;
    miniDrevoY += 3;
    drevoY += 2;
    
    drawEverything();
    requestAnimFrame(update);
}

function drawEverything(){
// ciary
    context.beginPath();
    context.moveTo(125, 0);
    context.lineTo(125, 550);

    context.moveTo(250, 0);
    context.lineTo(250, 550);

    context.moveTo(375, 0);
    context.lineTo(375, 550);
    context.stroke();

    context.drawImage(imgStone, poloha[stoneX], stoneY, 120, 100);
    context.drawImage(imgMiniDrevo, poloha[miniDrevoX], miniDrevoY, 120, 70);
    context.drawImage(imgDrevo, poloha[drevoX], drevoY, 240, 70);
    context.drawImage(imgBoat, boatX, boatY, 100, 125);
}