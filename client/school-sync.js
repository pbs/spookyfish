var viewport = require('./viewport');
var deadReckoning = require('./dead-reckoning');
var messages = require('./messages');
var school = require('../shared/school');

var neverSynced = true;

// A module for handling syncing between the server and client. Periodically receives a new school position and
// attempts to rectify this on the client.
module.exports = {
  init: function() {
    messages.subscribe(function(data) {
      // when a message is received, reset feed points to match what the server has, and then attempt to fix fish
      // positions
      if (data.type === 'feedPoint') {
        school.setFeedPoints([data.x]);
      }

      // when a fish has crossed the boundary between screens, update its position
      if (data.type === 'clientPosition') {
        this.receiveVisibleSchoolUpdate(data.fish);
      }
    }.bind(this));
  },

  receiveVisibleSchoolUpdate: function(newFish) {
    // update the school's fish reference
    school.getById(newFish.id).deserializeExtraFields(newFish);
    // place fish via dead reckoning
    deadReckoning.zerothOrder(school.getById(newFish.id), newFish);

    neverSynced = false;
  }
};
