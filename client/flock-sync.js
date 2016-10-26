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
    var totalDistanceError = 0;
    for(var i = 0; i < newBoids.length; i++) {
      var dx = flock.boids()[i][0] - newBoids[i][0];
      var dy = flock.boids()[i][1] - newBoids[i][1];
      var distanceError = Math.sqrt(dx * dx + dy * dy);
      totalDistanceError += distanceError;

      if(distanceError > 20) {
        flock.boids()[i] = deadReckoning.zerothOrder(flock.boids()[i], newBoids[i]);
      } else {
        flock.boids()[i] = deadReckoning.secondOrder(flock.boids()[i], newBoids[i]);
      }
    }
    console.log('Average position error:', totalDistanceError / newBoids.length);
  }
};
