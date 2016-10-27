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
  this.x = rand(SCHOOL_MIN_X, SCHOOL_MAX_X);
  this.y = rand(SCHOOL_MIN_Y, SCHOOL_MAX_Y);
  this.vx = this.options.restingSpeed * rand(0.9, 1.1);
  if(maybe(0.5)) {
    this.vx *= -1;
  }
  this.vy = rand(-3.0, 3.0);

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

  if(maybe(0.01)) {
    this.vy = rand(-3.0, 3.0);
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

Fish.prototype.approachFeedPoints = function(feedPoints) {
  var closestIndex = -1;
  var closestXDistance = Infinity;
  for(var i = 0; i < feedPoints.length; i++) {
    var distance = Math.abs(feedPoints[i].x - this.x);
    if(distance < closestXDistance) {
      closestXDistance = distance;
      closestIndex = i;
    }
  }

  if(closestIndex === -1) {
    return;
  }

  if(closestXDistance < 20 && this.y < 20) {
    return;
  }

  var closestFeedPointX = feedPoints[closestIndex].x;
  var approachAngle = Math.atan2(-this.y, closestFeedPointX - this.x);
  var velocity = 50;
  this.vx = velocity * Math.cos(approachAngle);
  this.vy = velocity * Math.sin(approachAngle);
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
