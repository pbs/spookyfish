var SCHOOL_MIN_X = 0;
var SCHOOL_MAX_X = 500;
var SCHOOL_MIN_Y = 0;
var SCHOOL_MAX_Y = 500;

var rand = function(a, b) {
  return Math.random() * (b - a) + a;
}

var Fish = function(options) {
  this.options = options;

  this.id = Math.floor(Math.random() * 100000);
  this.x = rand(SCHOOL_MIN_X, SCHOOL_MAX_X);
  this.y = rand(SCHOOL_MIN_Y, SCHOOL_MAX_Y);
  this.vx = 1;
  this.vy = 0;
  this.startled = 0;
};

Fish.prototype.update = function() {
  var dt = 1 / 60;

  // basic motion
  this.x += this.vx * dt;
  this.y += this.vy * dt; 

  // startled updates
  if(this.startled > 0) {
    this.startled -= 0.1 * dt;
    this.startled = Math.max(this.startled, 0);
  }
  if(Math.random() < 0.001) {
    this.startled = 1;
    console.log('Startled', this.id);
  }

  var speed = this.startled * (this.options.startledSpeed - this.options.restingSpeed) + this.options.restingSpeed;
  var theta = Math.atan2(this.vy, this.vx);
  this.vx = speed * Math.cos(theta);
  this.vy = speed * Math.sin(theta);

  // Wall collision
  if(this.x < SCHOOL_MIN_X) {
    this.x = SCHOOL_MIN_X;
    this.vx = Math.abs(this.vx);
  } else if(this.x > SCHOOL_MAX_X) {
    this.x = SCHOOL_MAX_X;
    this.vx = -Math.abs(this.vx);
  }
  
  if(this.y < SCHOOL_MIN_Y) {
    this.y = SCHOOL_MIN_Y;
    this.vy = Math.abs(this.vy);
  } else if(this.y > SCHOOL_MAX_Y) {
    this.y = SCHOOL_MAX_Y;
    this.vy = -Math.abs(this.vy);
  }
}

Fish.prototype.serialize = function() {
  return {
    x: this.x,
    y: this.y,
    vx: this.vx,
    vy: this.vy,
    startled: this.startled
  };
};

module.exports = Fish;
