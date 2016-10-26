var boids = require('boids');
var viewport = require('./viewport');
var deadReckoning = require('./dead-reckoning');

var sharedFlock = require('../shared/flock');

var flock = null;

sharedFlock.receiveVisibleFlockUpdate = function(newBoids) {
  for(var i = 0; i < newBoids.length; i++) {
    flock.boids[i] = deadReckoning.zerothOrder(flock.boids[i], newBoids[i]);
  }
};
