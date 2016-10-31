var config = require('./config');
var viewport = require('../client/viewport');
var messages = require('../client/messages');
var random = require('./random');

var GLOBAL_ID = 0;

// Stubs out a fish, giving it a random id, position, and movement parameters
var Fish = function(options) {
  this.options = options;

  this.id = GLOBAL_ID++;

  // the x and y position
  this.x = this.id / config.FISH_COUNT * config.WORLD_MAX_X;
  this.y = random.between(0, config.WORLD_MAX_Y);

  // the direction the fish is moving, could be left or right
  this.vx = config.FISH_RESTING_SPEED * random.between(0.9, 1.1);
  if(random.maybe(0.5)) {
    this.vx *= -1;
  }

  // make the fish drift a little upwards
  this.vy = random.between(-3.0, 3.0);

  // the size of the fish
  this.scale = Math.floor(Math.random() * (5 - 2) + 2 ) / 5;

  // the speed at which the fish drifts normally
  this.individualRestingSpeed = Math.abs(this.vx);

  // a flag to keep track of the speed a fish should have after it makes a turn around
  this.speedAfterTurn = 0;

  // the direction the fish is turning. Used during the process of a random turn
  this.turnDirection = 0;

  // The depth at which the fish generally likes to hang out
  this.preferredDepth = this.y;

  // whether or not it's in "feeding mode"
  this.feeding = false;

  // whether or not it's in "startled mode"
  this.startled = false;

  // the previous transition state
  this.transitioned = false;

  // whether or not it's transitioning to a new viewport
  this.transitioning = false;
};

// The list of fields that we want to share between the server and the client
Fish.serializableFields = [
  'id',
  'x',
  'y',
  'vx',
  'vy',
  'scale',
  'individualRestingSpeed',
  'speedAfterTurn',
  'turnDirection',
  'preferredDepth',
  'feeding',
  'startled'
];

Fish.prototype.update = function() {
  var dt = 1 / 60;

  this.isTransitioning();

  // basic motion
  this.x += this.vx * dt;
  this.y += this.vy * dt;

  if (this.transitioning) {
    // Do not drift or turn the fish if it is transitioning to a new screen
    this.vy = 0;
  } else {
    // Movement quirks
    //this.doTurn();
    //this.doMiniStartle();

    // Every once and a while turn drift in a different direction vertically
    if(random.maybe(0.01)) {
      this.vy = random.between(-3.0, 3.0);
    }

    // However, if we've gone too far vertically make the fish move back towards it's preferred depth
    if(Math.abs(this.preferredDepth - this.y) > 40 && !this.feeding) {
      this.vy = Math.sign(this.preferredDepth - this.y) * random.between(10, 15);
    }
  }

  this.checkCollision();

};

// Calculate if the current fish is ready to transition to another client screen
Fish.prototype.isTransitioning = function() {
  var xrange = this.x % config.WINDOW_DEFAULT_WIDTH;
  var xdir = Math.sign(this.vx);

  this.transitioned = this.transitioning;
  this.transitioning = ((xrange >= 97 && xdir === 1) || (xrange <=3 && xdir === -1));
  if (!this.transitioned && this.transitioning && viewport.ownsFish(this)) {
    var newFishScreenIndex = null;
    if(xdir === -1) {
      newFishScreenIndex = (viewport.screenIndex() + config.VIEWPORT_COUNT - 1) % config.VIEWPORT_COUNT;
    } else {
      newFishScreenIndex = (viewport.screenIndex() + 1) % config.VIEWPORT_COUNT;
    }

    console.log('Pushing', this.id, 'from', viewport.screenIndex(), 'to', newFishScreenIndex);
    console.log('  x=', this.x, 'y=', this.y, 'vx=', this.vx);

    // Update position through a pub-sub event
    messages.sendTransition({ fish: this.serialize() });
  }
};

// Handles startling logic. Every so often, the fish will get scared and move faster to get away!
Fish.prototype.doMiniStartle = function() {
  // If we're not already startled, we might just become startled
  if(!this.startled && random.maybe(0.001)) {
    this.startled = true;
    this.vx = config.FISH_STARTLE_SPEED * random.between(0.9, 1.1);
  }
  
  // if we're still above our resting speed, slowly reduce it until we're back at our normal speed
  if(Math.abs(this.vx) > this.individualRestingSpeed) {
    this.vx *= 0.99;
  }

  // If we lowered our speed enough, switch out of started mode and get ready to be startled again!
  if(Math.abs(this.vx) < this.individualRestingSpeed) {
    this.startled = false;
    this.vx = Math.sign(this.vx) * this.individualRestingSpeed;
  }
};

// handles random turn logic
Fish.prototype.doTurn = function() {
  // If we're not currently turning, we might just start turning. In this case we always turn to the opposite
  // direction that we're currently going
  if(this.turnDirection === 0 && random.maybe(0.001)) {
    this.turnDirection = -Math.sign(this.vx);
    this.speedAfterTurn = -this.vx;
  }

  // if we're going left, lower vx into the negatives. If right, raise vx to the positives
  if(this.turnDirection === -1 && this.vx > this.speedAfterTurn) {
    this.vx -= 1;
  } else if(this.turnDirection === 1 && this.vx < this.speedAfterTurn) {
    this.vx += 1;
  }

  // if we've reached our target speed after the turn, get out of turn mode
  if(this.turnDirection === -1 && this.vx <= this.speedAfterTurn) {
    this.turnDirection = 0;
  } else if(this.turnDirection === 1 && this.vx >= this.speedAfterTurn) {
    this.turnDirection = 0;
  }
};

Fish.prototype.checkCollision = function() {
  // Wall collision
  if(this.x < -5) {
    this.x = config.WORLD_MAX_X + 4;
  } else if(this.x > config.WORLD_MAX_X + 5) {
    this.x = -4;
  }
  
  if(this.y < 0) {
    this.y = 0;
    this.vy = Math.abs(this.vy);
  } else if(this.y > config.WORLD_MAX_Y) {
    this.y = config.WORLD_MAX_Y;
    this.vy = -Math.abs(this.vy);
  }
};

// Given an array of feed points, finds the closest feed point and then directs the fish to it
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

  // if there was no closest fish, nothing to do
  if(closestIndex === -1) {
    this.feeding = false;
    return;
  }

  // if we're pretty close, don't attempt to turn so the fish overshoots a little, making it look more realistic
  if(this.y < config.FISH_FOOD_Y_OVERSHOOT || closestXDistance < config.FISH_FOOD_X_OVERSHOOT) {
    this.feeding = false;
    return;
  }

  // if we got this far, we found a feeding point. Figure out the angle we should use to get to the food and set the
  // velocity to go there
  this.feeding = true;
  var closestFeedPointX = feedPoints[closestIndex].x;
  var approachAngle = Math.atan2(-this.y, closestFeedPointX - this.x);
  var velocity = config.FISH_FOOD_APPROACH_SPEED;
  this.vx = velocity * Math.cos(approachAngle);
  this.vy = velocity * Math.sin(approachAngle);
};

// handy serialization method for socket communication
Fish.prototype.serialize = function() {
  var serialized = {};
  Fish.serializableFields.forEach(function(fieldName) {
    serialized[fieldName] = this[fieldName];
  }.bind(this));
  return serialized;
};

// takes raw server data and updates this fish with the data. Importantly, we ignore position/velocity stuff because
// we want dead reckoning to smooth that out for us
Fish.prototype.deserializeExtraFields = function(serverData) {
  Fish.serializableFields.forEach(function(fieldName) {
    if(fieldName == 'x' || fieldName == 'y' || fieldName == 'vx' || fieldName == 'vy') {
      return
    }

    this[fieldName] = serverData[fieldName];
  }.bind(this)); 
};

module.exports = Fish;
