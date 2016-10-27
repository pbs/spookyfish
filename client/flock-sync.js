var viewport = require('./viewport');
var deadReckoning = require('./dead-reckoning');
var messages = require('./messages');
var school = require('../shared/school');

var neverSynced = true;

module.exports = {
  init: function() {
    messages.subscribe(function(data) {
      if(data.type !== 'position') {
        return;
      }

      this.receiveVisibleFlockUpdate(data.boids);
    }.bind(this));
  },

  receiveVisibleFlockUpdate: function(newBoids) {
    return;
    var totalDistanceError = 0;
    for(var i = 0; i < newBoids.length; i++) {
      var dx = school.get(i).x - newBoids[i].x;
      var dy = school.get(i).y - newBoids[i].x;

      var distanceError = Math.sqrt(dx * dx + dy * dy);
      totalDistanceError += distanceError;

      /*
       * // Figure this out...
      if(neverSynced || distanceError > 50) {
        flock.boids()[i] = deadReckoning.zerothOrder(flock.boids()[i], newBoids[i]);
      } else {
        flock.boids()[i] = deadReckoning.secondOrder(flock.boids()[i], newBoids[i]);
      }
     */
    }

    neverSynced = false;

    console.log('Average position error:', totalDistanceError / newBoids.length);
  }
};
