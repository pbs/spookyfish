var config = require('./config');
var element = null;

var top = 0;
var left = 0;
var bottom = window.innerWidth;
var right = window.innerHeight;

var viewportWidth = -1;
var viewportHeight = -1;

module.exports = {
  setElement: function(newElement) {
    element = newElement;
  },

  screenIndex: function() {
    var index = Number(location.hash.substring(1))
    if(isNaN(index)) {
      index = 0;
    }
    return index;
  },

  fromHash: function() {
    var index = this.screenIndex();
    var screenLeft = index * config.WINDOW_DEFAULT_WIDTH;
    var screenRight = screenLeft + config.WINDOW_DEFAULT_WIDTH;
    this.setBoundaries(0, screenLeft, config.WINDOW_DEFAULT_HEIGHT, screenRight);
  },

  setBoundaries: function(newTop, newLeft, newBottom, newRight) {
    top = newTop;
    left = newLeft;
    bottom = newBottom;
    right = newRight;

    viewportWidth = right - left;
    viewportHeight = bottom - top;
  },

  containsFish: function(fish) {
    return fish.x >= left && fish.x < right && fish.y >= top && fish.y < bottom;
  },

  ownsFish: function(fish) {
    return Math.floor(fish.id / config.FISH_COUNT) === this.screenIndex();
  },

  attachLocalCoords: function(fish) {
    var elementWidth = window.innerWidth;
    var elementHeight = window.innerHeight;
    return {
      fish: fish,
      localCoords: {
        x: (fish.x - left) / viewportWidth * elementWidth,
        y: (fish.y - top) / viewportHeight * elementHeight
      }
    }
  },

  toGlobalCoords: function(point) {
    return {
      x: point.x / window.innerWidth * viewportWidth + left,
      y: point.y / window.innerHeight * viewportHeight + top
    };
  }
};
