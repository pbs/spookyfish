var SCHOOL_MIN_X = 0;
var SCHOOL_MAX_X = 500;
var SCHOOL_MIN_Y = 0;
var SCHOOL_MAX_Y = 500;

var rand = function(a, b) {
  return Math.random() * (b - a) + a;
}

var maybe = function(p) {
  return Math.random() <= p;
}

var Fish = function(options) {
  this.options = options;

  this.id = Math.floor(Math.random() * 100000);
  
  this.minX = this.options.minX; 
  this.minY = this.options.minY;
  this.maxX = this.options.maxX;
  this.maxY = this.options.maxY;
  
  this.x = rand(this.minX, this.maxX);
  this.y = rand(this.minY, this.maxY);
  this.vx = this.options.restingSpeed * rand(0.9, 1.1);
  if(maybe(0.5)) {
    this.vx *= -1;
  }
  this.vy = rand(-0.5, 0.5);

  this.individualRestingSpeed = Math.abs(this.vx);
  this.speedAfterTurn = 0;
  this.turnDirection = 0;
  this.startled = false;
};

Fish.prototype.update = function() {
  var dt = 1 / 60;

  // basic motion
  this.x += this.vx * dt;
  this.y += this.vy * dt;   

  this.doTurn();

  this.doMiniStartle();

  if(maybe(0.1)) {
    this.vy = rand(-0.5, 0.5);
  }

  this.checkCollision();
}

Fish.prototype.doMiniStartle = function() {
  if(!this.startled && maybe(0.001)) {
    this.startled = true;
    this.vx *= rand(2, 3);
  }
  
  if(Math.abs(this.vx) > this.individualRestingSpeed) {
    this.vx *= 0.99;
  }

  if(Math.abs(this.vx) < this.individualRestingSpeed) {
    this.startled = false;
    this.vx = Math.sign(this.vx) * this.individualRestingSpeed;
  }
};

Fish.prototype.doTurn = function() {
  if(this.turnDirection === 0 && maybe(0.001)) {
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
  if(this.x < this.minX) {
    this.x = this.minX;
    this.vx = Math.abs(this.vx);
  } else if(this.x > this.maxX) {
    this.x = this.maxX;
    this.vx = -Math.abs(this.vx);
  }
  
  if(this.y < this.minY) {
    this.y = this.minY;
    this.vy = Math.abs(this.vy);
  } else if(this.y > this.maxY) {
    this.y = this.maxY;
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
