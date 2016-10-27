var boids = require('boids');

var flock = null;
var FLOCK_MIN_X = 0;
var FLOCK_MAX_X = 500;
var FLOCK_MIN_Y = 0;
var FLOCK_MAX_Y = 500;

module.exports = {
  init: function(width, height) {
    flock = boids({
      boids: 10,              // The amount of boids to use 
      speedLimit: 0.5,          // Max steps to take per tick 
      accelerationLimit: 0.2,   // Max acceleration per tick 
      separationDistance: 100, // Radius at which boids avoid others 
      alignmentDistance: 500, // Radius at which boids align with others 
      cohesionDistance: 180,  // Radius at which boids approach others 
      separationForce: 0.10,  // Speed to avoid at 
      alignmentForce: 0.50,   // Speed to align with other boids 
      choesionForce: 0.05,     // Speed to move towards other boids 
    });

    flock.boids.forEach(function(boid) {
      boid[0] = Math.random() * width;
      boid[1] = Math.random() * height;
    });
  },

  tick: function() {
    flock.tick();

    flock.boids.forEach(function(boid) {
      if(boid[0] < FLOCK_MIN_X) {
        boid[0] = FLOCK_MIN_X;
        boid[2] = 10;
      } else if(boid[0] > FLOCK_MAX_X) {
        boid[0] = FLOCK_MAX_X;
        boid[2] = -10;
      }

      if(boid[1] < FLOCK_MIN_Y) {
        boid[1] = FLOCK_MIN_Y;
        boid[3] = 10;
      } else if(boid[1] > FLOCK_MAX_Y) {
        boid[1] = FLOCK_MAX_Y;
        boid[3] = -10;
      }
    });
  },

  boids: function() {
    return flock.boids;
  },

  addAttractor: function(x, y, radius, force) {
    flock.attractors.push([x, y, radius, Math.abs(force)]);
  },

  addRepeller: function(x, y, radius, force) {
    flock.attractors.push([x, y, radius, -Math.abs(force)]);
  }
};
