module.exports = {
  // Gets a random number between a and b
  between: function(a, b) {
    return Math.random() * (b - a) + a;
  },

  // Return true with probability p
  maybe: function(p) {
    return Math.random() <= p;
  }
};
