var faye = require('faye');

var client;
var subscribers = [];

// A nice wrapper around the faye client
module.exports = {
  init: function() {
    client = new faye.Client('http://localhost:8080/faye');
    client.subscribe('/messages', function(data) {
      subscribers.forEach(function(func) {
        func(data);
      });
    });
  },

  subscribe: function(action) {
    subscribers.push(action);
  },

  publish: function(data) {
    client.publish('/messages', data);
  }
};
