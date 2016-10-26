var faye = require('faye');

var client;
var subscribers = [];

module.exports = {
  init: function() {
    client = new faye.Client(location.origin + 'faye');
    client.subscribe('/events', function(data) {
      subscribers.forEach(function(func) {
        func(data);
      });
    });
  },

  subscribe: function(action) {
    subscribers.push(action);
  }
};
