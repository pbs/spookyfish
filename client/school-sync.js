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
      if(data.type !== 'position') {
        return;
      }
    
      // when a message is received, reset feed points to match what the server has, and then attempt to fix fish
      // positions
      school.setFeedPoints(data.school.feedPoints);
      this.receiveVisibleSchoolUpdate(data.school.fish);
    }.bind(this));
  },

  receiveVisibleSchoolUpdate: function(newFish) {
    // for each of the fish, apply some dead reckoning algorithm to make the fish line up
    for(var i = 0; i < newFish.length; i++) {
      school.get(i).deserializeExtraFields(newFish[i]);     

      if(neverSynced) {
        deadReckoning.zerothOrder(school.get(i), newFish[i]);
      } else {
        //deadReckoning.firstOrder(school.get(i), newFish[i]);
      }
    }

    neverSynced = false;
  }
};
