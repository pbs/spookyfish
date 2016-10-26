var boids = require('boids');
var viewport = require('./viewport');
var deadReckoning = require('./dead-reckoning');
var messages = require('./messages');

var flock = null;

module.exports = {
  init: function() {
    messages.subscribe(function() {
      console.log('Received a message!');
    });
  },

  receiveVisibleFlockUpdate: function(newBoids) {
    for(var i = 0; i < newBoids.length; i++) {
      flock.boids[i] = deadReckoning.zerothOrder(flock.boids[i], newBoids[i]);
    }
  }
};
