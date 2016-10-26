var viewport = require('./viewport');
var deadReckoning = require('./dead-reckoning');
var messages = require('./messages');
var flock = require('../shared/flock');

module.exports = {
  init: function() {
    messages.subscribe(function(data) {
      this.receiveVisibleFlockUpdate(data.boids);
    }.bind(this));
  },

  receiveVisibleFlockUpdate: function(newBoids) {
    for(var i = 0; i < newBoids.length; i++) {
      flock.boids()[i] = deadReckoning.zerothOrder(flock.boids()[i], newBoids[i]);
    }
  }
};
