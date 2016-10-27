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

      this.receiveVisibleSchoolUpdate(data.boids);
    }.bind(this));
  },

  receiveVisibleSchoolUpdate: function(newBoids) {
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
        school.boids()[i] = deadReckoning.zerothOrder(school.boids()[i], newBoids[i]);
      } else {
        school.boids()[i] = deadReckoning.secondOrder(school.boids()[i], newBoids[i]);
      }
     */
    }

    neverSynced = false;

    console.log('Average position error:', totalDistanceError / newBoids.length);
  }
};
