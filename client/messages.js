var faye = require('faye');

var client;
var subscribers = [];

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
  }
};
