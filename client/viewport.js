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
