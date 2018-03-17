//Vars
var numPoints = 7; //7 = setpagon, 5 = pentago etc.
var points = []; //current points
var GPoints = []; //global static points
var r;
var centerX, centerY;
var finTransition = false;

function setup() {
	createCanvas(windowWidth, windowHeight); //define canvas
  centerX = windowWidth/2;
  centerY = windowHeight/2;

  r = 100; //dist from center
	rUp = true;
	createPoints(points, 0, 0, r, numPoints); // init points
	createPoints(GPoints, 0, 0, r, numPoints); // init points
}

function draw() {
	background(51);
	//stroke(255, 255, 255, 10);
	stroke(255);
	strokeWeight(2);

  push();
    translate(centerX, centerY);
		//rotate(frameCount/ 100);  //enable to rotate shape
    rotate(PI/14); //align point with top
		drawPoints(points);
		fill(227, 255, 0);
		drawPoints(GPoints);
		drawLines();
		transitionPoints();
  pop();
}

function createPoints(points, x, y, radius, npoints) {
	var index = 0;
  var angle = TWO_PI / npoints;
  for(var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    points[index++] = {sx, sy};  //fill points array
  }
}

function drawPoints(points) {
	for(var i = 0; i < points.length; i++) {
		ellipse(points[i]["sx"], points[i]["sy"], 5, 5);
	}
}

function drawLines() {
	var skip = 3;
	for(var i = 0; i < points.length; i++) {
		var x = points[i]["sx"];
		var y = points[i]["sy"];
		var newX, newY;

		if(i + skip < points.length) {
			newX = points[i+skip]["sx"];
			newY = points[i+skip]["sy"];
		} else {
			newX = points[(i+skip) % points.length]["sx"];
			newY = points[(i+skip) % points.length]["sy"];
		}
		line(x, y, newX, newY);
	}
}

function transitionPoints() {
	if(!finTransition) {
		var skip = 3;
		for(var i = 0; i < points.length; i++) {
			var x = points[i]["sx"];
			var y = points[i]["sy"];
			var newX, newY;

			//set destination
			if(i + skip < points.length) {
				newX = GPoints[i+skip]["sx"];
				newY = GPoints[i+skip]["sy"];
			} else {
				newX = GPoints[(i+skip) % points.length]["sx"];
				newY = GPoints[(i+skip) % points.length]["sy"];
			}

			//move points
			if(x < newX)
				x+=.5;
			else if(x > newX)
				x-=.5;

			if(y < newY)
				y+=.5;
			else if (y > newY)
				y-=.5;

			if(abs(x-newX) < 1 && abs(y-newY) <1)
				finTransition = true; //need to chek for all of them

			//reassing temp points to _points[]
			points[i]["sx"] = x;
			points[i]["sy"] = y;
		}
	}
}

//increase/decrease r (-100, 100)
function count() {
	if (rUp) {
    ++r;
    if (r >= 100)
      rUp = false;
  } else {
    --r;
    if (r <= 0)
      rUp = true;
  }
}
