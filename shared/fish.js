var FLOCK_MIN_X = 0;
var FLOCK_MAX_X = 500;
var FLOCK_MIN_Y = 0;
var FLOCK_MAX_Y = 500;

var rand = function(a, b) {
  return Math.random() * (b - a) + a;
}

var Fish = function(options) {
  this.x = rand(FLOCK_MIN_X, FLOCK_MAX_X);
  this.y = rand(FLOCK_MIN_Y, FLOCK_MAX_Y);
  this.vx = 1;
  this.vy = 0;
};

Fish.prototype.update = function() {
  var dt = 1 / 60;

  // basic motion
  this.x += this.vx * dt;
  this.y += this.vy * dt; 

  this.vy += Math.random() * dt;

  // Wall collision
  if(this.x < FLOCK_MIN_X) {
    this.x = FLOCK_MIN_X;
    this.vx = Math.abs(this.vx);
  } else if(this.x > FLOCK_MAX_X) {
    this.x = FLOCK_MAX_X;
    this.vx = -Math.abs(this.vx);
  }
  
  if(this.y < FLOCK_MIN_Y) {
    this.y = FLOCK_MIN_Y;
    this.vy = Math.abs(this.vy);
  } else if(this.y > FLOCK_MAX_Y) {
    this.y = FLOCK_MAX_Y;
    this.vy = -Math.abs(this.vy);
  }
}

Fish.prototype.serialize = function() {
  return {
    x: this.x,
    y: this.y,
    vx: this.vx,
    vy: this.vy
  };
};

module.exports = Fish;
