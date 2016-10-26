var boids = require('boids');

var flock = null;

module.exports = {
  init: function(width, height) {
    flock = boids({
      boids: 100,              // The amount of boids to use 
      speedLimit: 1,          // Max steps to take per tick 
      accelerationLimit: 0.2,   // Max acceleration per tick 
      separationDistance: 60, // Radius at which boids avoid others 
      alignmentDistance: 500, // Radius at which boids align with others 
      cohesionDistance: 180,  // Radius at which boids approach others 
      separationForce: 0.05,  // Speed to avoid at 
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
