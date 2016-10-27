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

      this.receiveVisibleSchoolUpdate(data.school);
    }.bind(this));
  },

  receiveVisibleSchoolUpdate: function(newFish) {
    var totalDistanceError = 0;
    for(var i = 0; i < newFish.length; i++) {
      //if(neverSynced) {
      //  deadReckoning.zerothOrder(school.get(i), newFish[i]);
      //} else {
      //  deadReckoning.firstOrder(school.get(i), newFish[i]);
      //}
    }

    neverSynced = false;
  }
};
