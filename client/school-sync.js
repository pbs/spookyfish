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

      school.setFeedPoints(data.feedPoints);
      this.receiveVisibleSchoolUpdate(data.school.fish);
    }.bind(this));
  },

  receiveVisibleSchoolUpdate: function(newFish) {
    var totalDistanceError = 0;
    for(var i = 0; i < newFish.length; i++) {
      // copy hidden fields
      school.get(i).startled = newFish[i].startled;

      if(neverSynced) {
        deadReckoning.zerothOrder(school.get(i), newFish[i]);
      } else {
        //deadReckoning.firstOrder(school.get(i), newFish[i]);
      }
    }

    neverSynced = false;
  }
};
