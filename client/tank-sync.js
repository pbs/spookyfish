var viewport = require('./viewport');
var deadReckoning = require('./dead-reckoning');
var messages = require('./messages');
var school = require('./school');
var sub = require('./sub');

var neverSynced = true;

// A module for handling syncing between the server and client. Periodically receives a new school position and
// attempts to rectify this on the client.
module.exports = {
  init: function() {
    // subscribe only to my viewport
    var viewportIndex = viewport.screenIndex();
    
    messages.onTransition(viewportIndex, function(data) {
      this.receiveVisibleSchoolUpdate(data.fish);
    }.bind(this));

    messages.onFeedPoint(function(data) {
      school.addFeedPoint(data.x);
    });
  },

  receiveVisibleSchoolUpdate: function(newFish) {
    console.log('Received news of fish ', newFish.id);
    // update the school's fish reference
    school.getById(newFish.id).deserializeExtraFields(newFish);
    // place fish via dead reckoning
    deadReckoning.zerothOrder(school.getById(newFish.id), newFish);

    neverSynced = false;
  }
};
