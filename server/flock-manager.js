var school = require('../shared/school');

var UPDATE_INTERVAL = 1000;
var TIME_STEP = 1000 / 60;
var TICKS_PER_UPDATE = UPDATE_INTERVAL / TIME_STEP;

var client = null;

module.exports = {
  init: function(fayeClient, width, height) {
    school.init();
    client = fayeClient;

    setInterval(this.update, UPDATE_INTERVAL)
  },

  update: function() {
    for(var i = 0; i < TICKS_PER_UPDATE; i++) {
      school.tick();
    }

    // notify the press
    console.log(new Date(), 'Publishing latest flock positions');
    client.publish('/messages', {
      type: 'position',
      school: school.serialize()
    });
  }
};
