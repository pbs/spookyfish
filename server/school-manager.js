var school = require('../shared/school');

var UPDATE_INTERVAL = 1000;
var TIME_STEP = 1000 / 60;
var TICKS_PER_UPDATE = UPDATE_INTERVAL / TIME_STEP;

var client = null;

module.exports = {
  init: function(fayeClient, width, height) {
    school.init();
    client = fayeClient;

    client.subscribe('/messages', this.onReceiveFeedPoint);

    setInterval(this.update, UPDATE_INTERVAL)
  },

  update: function() {
    for(var i = 0; i < TICKS_PER_UPDATE; i++) {
      school.tick();
    }

    // notify the press
    client.publish('/messages', {
      type: 'position',
      school: school.serialize()
    });
  },

  onReceiveFeedPoint: function(data) {
    if(data.type !== 'feedPoint') {
      return;
    }

    school.addFeedPoint(data.x);
  }
};
