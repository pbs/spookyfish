var boids = require('boids');
var viewport = require('./viewport');

var flock = null;

module.exports = {
  init: function(width, height) {
    flock = boids({
      boids: 20,              // The amount of boids to use 
      speedLimit: 2,          // Max steps to take per tick 
      accelerationLimit: 0.2,   // Max acceleration per tick 
      separationDistance: 60, // Radius at which boids avoid others 
      alignmentDistance: 180, // Radius at which boids align with others 
      cohesionDistance: 180,  // Radius at which boids approach others 
      separationForce: 0.05,  // Speed to avoid at 
      alignmentForce: 0.25,   // Speed to align with other boids 
      choesionForce: 0.5,     // Speed to move towards other boids 
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
  },

  reportVisibleFlock: function() {
    var serializedFlockData = {};
    for(var i = 0; i < flock.boids.length; i++) {
      if(!viewport.containsBoid(flock.boids[i])) {
        continue;
      }

      serializedFlockData[i] = flock.boids[i];
    }

    // TODO: Send this over a socket!
  },

  reportEntireFlock: function() {
    // TODO: Send flock.boids over the wire
  },

  receiveVisibleFlockUpdate: function(boidSet) {
    Object.keys(boidSet).forEach(function(index) {
      flock.boids[index] = boidSet[index];
    });
  },
};
