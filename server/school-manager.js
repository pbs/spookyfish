var school = require('../shared/school');

var client = null;

module.exports = {
  init: function(fayeClient, width, height) {
    school.init();
    client = fayeClient;

    client.subscribe('/messages', this.onReceiveFeedPoint);
  },

  onReceiveFeedPoint: function(data) {
    if(data.type !== 'feedPoint') {
      return;
    }

    school.addFeedPoint(data.x);
  }
};
