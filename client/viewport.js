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

    console.log(top, left, bottom, right);

    viewportWidth = right - left;
    viewportHeight = bottom - top;
  },

  containsBoid: function(boid) {
    return boid[0] >= left && boid[0] < right && boid[1] >= top && boid[1] < bottom;
  },

  toLocalCoords: function(boid) {
//    var elementWidth = Number(element.getAttribute('width'));
//    var elementHeight = Number(element.getAttribute('height'));    
    var elementWidth = window.innerWidth;
    var elementHeight = window.innerHeight;
    var x = (boid[0] - left) / viewportWidth * elementWidth;
    var y = (boid[1] - top) / viewportHeight * elementHeight;
    boid[0] = x;
    boid[1] = y;
    return boid;
  }
};
