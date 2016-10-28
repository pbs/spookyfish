var config = require('./config');
var random = require('./random');
module.exports = {
  init: function() {
    this.x = config.WINDOW_DEFAULT_WIDTH / 2;
    this.y = config.WINDOW_DEFAULT_HEIGHT * random.between(0.4, 0.6);
    this.vx = 10;
    this.vy = 0;
  },

  tick: function() {
    this.x += this.vx * 1 / 60;
    this.y += this.vy * 1 / 60;
  },

  serialize: function() {
    var serialized = {};
    this.serializableFields.forEach(function(field) {
      serialized[field] = this[field];
    }.bind(this));

    return serialized;
  },

  unserialize: function(serialized) {
    this.serializableFields.forEach(function(field) {
      this[field]= serialized[field];
    }.bind(this));
  },

  serializableFields: ['x', 'y', 'vx', 'vy']
};
