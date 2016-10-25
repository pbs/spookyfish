var top = 0;
var left = 0;
var bottom = 500;
var right = 500;

module.exports = {
  set: function(newTop, newLeft, newBottom, newRight) {
    top = newTop;
    left = newLeft;
    bottom = newBottom;
    right = newRight;
  },

  containsBoid: function(boid) {
    return boid[0] >= left && boid[0] < right && boid[1] >= top && boid[1] < bottom;
  },

  toLocalCoords: function(boid) {
    return [ boid[0] - left, boid[1] - top ];
  }
};
