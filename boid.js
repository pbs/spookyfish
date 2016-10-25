var BOID_SPEED = 60;
var MAX_Y = 100;

// Boid parameters
var AVOIDANCE = 0;
var COHESION = 1;
var ALIGNMENT = 1;
var ATTRACTION = 1;

var Boid = function(x, y, initialVelocity, initialHeading) {
  this.x = x;
  this.y = y;
  this.velocity = initialVelocity;
  this.heading = initialHeading;
};

Boid.prototype.step = function(dt) {
  this.x += dt * this.velocity * Math.cos(this.heading);
  this.y += dt * this.velocity * Math.sin(this.heading);
};

Boid.prototype.adjustHeading = function(flock, attractionPointX, attractionPointY, dt) {
  var neighborPosition = [0, 0];
  var averageNeighborHeading = 0;

  for(var i = 0; i < flock.length; i++) {
    neighborPosition[0] += flock[i].x;
    neighborPosition[1] += flock[i].y;
    averageNeighborHeading += flock[i].heading;
  }

  neighborPosition[0] /= flock.length;
  neighborPosition[1] /= flock.length;
  var dxToNeighbors = neighborPosition[0] - this.x;
  var dyToNeighbors = neighborPosition[1] - this.y;
  
  var avoidanceHeading = Math.atan2(dyToNeighbors, dxToNeighbors) + Math.PI;
  var cohesionHeading = Math.atan2(dyToNeighbors, dxToNeighbors);
  var alignmentHeading = averageNeighborHeading / flock.length;
  var attractionHeading = Math.atan2(attractionPointY - this.y, attractionPointX - this.x);

  var newHeading = 0;
  newHeading += AVOIDANCE * avoidanceHeading;
  newHeading += COHESION * cohesionHeading;
  newHeading += ALIGNMENT * alignmentHeading;
  newHeading += ATTRACTION * attractionHeading;
  newHeading /= (AVOIDANCE + COHESION + ALIGNMENT + ATTRACTION);

  this.heading = newHeading;
};

var Flock = function(boidCount, xMin, xMax) {
  this.boids = [];
  for(var i = 0; i < boidCount; i++) {
    var x = Math.random() * (xMax - xMin) + xMin;
    var y = Math.random() * MAX_Y;
    var heading = Math.random() * Math.PI * 2;
    this.boids.push(new Boid(x, y, BOID_SPEED, heading));
  }
};

Flock.prototype.update = function(dt) {
  var i;

  for(i = 0; i < this.boids.length; i++) {
    this.boids[i].adjustHeading(this.boids, 200, 200, dt);
  }

  for(i = 0; i < this.boids.length; i++) {
    this.boids[i].step(dt);
  }
};
