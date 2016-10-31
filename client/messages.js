var faye = require('faye');

var client;

// A nice wrapper around the faye client
module.exports = {
  init: function() {
    client = new faye.Client(location.origin + '/faye');
  },

  onTransition: function(viewportIndex, action) {
    return client.subscribe('/viewport/' + viewportIndex, action);
  },

  sendTransition: function(viewportIndex, data) {
    client.publish('/viewport/' + viewportIndex, data);
  }
};
