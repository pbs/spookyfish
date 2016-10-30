var faye = require('faye');

var client;

// A nice wrapper around the faye client
module.exports = {
  init: function() {
    client = new faye.Client(location.origin + '/faye');
  },

  subscribe: function(viewportIndex, action) {
    return client.subscribe('/messages/' + viewportIndex, action);
  },

  publish: function(viewportIndex, data) {
    client.publish('/messages/' + viewportIndex, data);
  }
};
