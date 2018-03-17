//Vars
var numPoints = 7;
var points = [];
var r;
var centerX, centerY;
var count = 0;

function setup() {
	createCanvas(windowWidth, windowHeight); //define canvas
  //angleMode(DEGREES); //config anglemode for degrees bc im bad at geometry

  centerX = windowWidth/2;
  centerY = windowHeight/2;

  r = 100; //dist from center
}

function draw() {
  push();
    translate(centerX, centerY);
    rotate(PI/14); //align point with top
    polygon(0, 0, r, numPoints);
  pop();
}


function polygon(x, y, radius, npoints) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
    if(count++ < 7 ) {
      points.push( {sx, sy} );
    }
  }
  endShape(CLOSE);
}

console.log(points);
