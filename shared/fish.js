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
  this.vx = this.options.restingSpeed * rand(0.9, 1.1);
  if(Math.random() < 0.5) {
    this.vx *= -1;
  }
  this.vy = rand(-0.5, 0.5);

  this.speedAfterTurn = 0;
  this.turnDirection = 0;

  this.startled = 0;
};

Fish.prototype.update = function() {
  var dt = 1 / 60;

  // basic motion
  this.x += this.vx * dt;
  this.y += this.vy * dt; 

  this.doTurn();

  if(Math.random() < 0.1) {
    this.vy = rand(-0.5, 0.5);
  }

  this.checkCollision();
}

Fish.prototype.doTurn = function() {
  if(this.turnDirection === 0 && Math.random() < 0.01) {
    this.turnDirection = -Math.sign(this.vx);
    this.speedAfterTurn = -this.vx;
  }

  if(this.turnDirection === -1 && this.vx > this.speedAfterTurn) {
    this.vx -= 1;
  } else if(this.turnDirection === 1 && this.vx < this.speedAfterTurn) {
    this.vx += 1;
  }

  if(this.turnDirection === -1 && this.vx <= this.speedAfterTurn) {
    this.turnDirection = 0;
  } else if(this.turnDirection === 1 && this.vx >= this.speedAfterTurn) {
    this.turnDirection = 0;
  }
};

Fish.prototype.checkCollision = function() {
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
};

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
