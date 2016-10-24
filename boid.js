var NEIGHBOR_DISTANCE = 10;
var TURN_SENSITIVITY = 0.5;
var MAX_Y = 100;

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

Boid.prototype.adjustHeading = function(flock, dt) {
  var neighborCount = 0;
  var neighborX = 0;
  var neighborY = 0;
  for(var i = 0; i < flock.length; i++) {
    var dx = this.x - flock[i].x;
    var dy = this.y - flock[i].y;

    if( (dx * dx + dy * dy) > NEIGHBOR_DISTANCE) {
      continue;
    }

    neighborX += dx;
    neighborY += dy;
  }

  var neighborHeading = Math.atan2(neighborY, neighborX);

  var timeSensitivity = TURN_SENSITIVITY * dt;
  this.heading = (1 - timeSensitivity) * this.heading + timeSensitivity * this.heading;

  if(this.y > MAX_Y) {
    this.heading = -MATH.PI / 2;
  }
};

var Flock = function(boidCount, xMin, xMax) {
  this.boids = [];
  for(var i = 0; i < boidCount; i++) {
    var x = Math.random() * (xMax - xMin) + xMax;
    var y = Math.random() * MAX_Y;
    var heading = Math.random() * Math.PI * 2;
    this.boids.push(new Boid(x, y, 10, heading));
  }
};

Flock.prototype.update = function(dt) {
  var i;

  for(i = 0; i < this.boids.length; i++) {
    this.boids[i].adjustHeading(this.boids, dt);
  }

  for(i = 0; i < this.boids.length; i++) {
    this.boids[i].step(dt);
  }
};
