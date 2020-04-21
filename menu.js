var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height/2;

context.font = "60px Arial";
context.textAlign = "center";
context.fillText("Row", x, y-170)
context.fillText("&Go", x, y-125)

context.font = "50px Arial";
context.textAlign = "center";
context.fillText("START", x, y+30);

context.font = "25px Arial";
context.textAlign = "center";
context.fillText("Ovladanie", x, y+80);

context.font = "25px Arial";
context.textAlign = "center";
context.fillText("O hre", x, y-30);