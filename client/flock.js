var boids = require('boids');

var flock = null;

module.exports = {
  init: function(size) {
    flock = boids({
      boids: 200,              // The amount of boids to use 
      speedLimit: 2,          // Max steps to take per tick 
      accelerationLimit: 0.1,   // Max acceleration per tick 
      separationDistance: 60, // Radius at which boids avoid others 
      alignmentDistance: 180, // Radius at which boids align with others 
      choesionDistance: 180,  // Radius at which boids approach others 
      separationForce: 0.15,  // Speed to avoid at 
      alignmentForce: 0.25,   // Speed to align with other boids 
      choesionForce: 0.1,     // Speed to move towards other boids 
      attractors: [
        [size / 2, size / 2, 50, 0.25]
      ]
    });

    flock.boids.forEach(function(boid) {
      boid[0] = Math.random() * size;
      boid[1] = Math.random() * size;
    });
  },

  tick: function() {
    flock.tick();
  },

  boids: function() {
    return flock.boids;
  }
};
