var seedrandom = require('seedrandom');

var rng = seedrandom(0);

module.exports = {
  seed: function(x) {
    rng = seedrandom(x);
  },

  // Gets a random number between a and b
  between: function(a, b) {
    return rng.quick() * (b - a) + a;
  },

  // Return true with probability p
  maybe: function(p) {
    return rng.quick() <= p;
  },

  // gets a random thing from an array
  fromArray: function(array) {
    return array[Math.floor(rng.quick() * array.length)];
  }
};
