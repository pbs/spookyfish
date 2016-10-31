var config = require('./config');
var messages = require('./messages');
var random = require('./random');
var viewport = require('./viewport');

module.exports = {
  init: function() {
    this.x = config.WINDOW_DEFAULT_WIDTH / 2;
    this.y = config.WINDOW_DEFAULT_HEIGHT * random.between(0.4, 0.6);
    this.vx = 7;
    this.vy = 0;
    this.transitioning = false;

    messages.onSubTransition(function(data) {
      this.x = data.x;
      this.y = data.y
      this.transitioning = !viewport.containsFish(this);
    }.bind(this));
  },

  tick: function() {
    this.x += this.vx * 1 / 60;
    this.y += this.vy * 1 / 60;

    var viewportBoundary = (viewport.screenIndex() + 1) * config.WINDOW_DEFAULT_WIDTH;
    if(this.x >= viewportBoundary && !this.transitioning) {
      messages.sendSubTransition({ x: this.x, y: this.y });
      this.transitioning = true;
    }

    if(this.x > config.WORLD_MAX_X + 20) {
      this.x = -20;
    }
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
