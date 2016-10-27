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
  this.vx = this.options.restingSpeed;
  this.vy = (Math.random() * 0.5) - 1;
  this.startled = 0;
};

Fish.prototype.update = function() {
  var dt = 1 / 60;

  // basic motion
  this.x += this.vx * dt;
  this.y += this.vy * dt; 

  /*
  var speed = this.startled * (this.options.startledSpeed - this.options.restingSpeed) + this.options.restingSpeed;
  var theta = Math.atan2(this.vy, this.vx);
  if(Math.random() < 0.5) {
    var turn = 0.2;
    theta += Math.random() * 2 * turn - turn;
  }
  this.vx = speed * Math.cos(theta);
  this.vy = speed * Math.sin(theta);
 */
  if(Math.random() < 0.1) {
    this.vy = (Math.random() * 0.5) - 1;
  }

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
