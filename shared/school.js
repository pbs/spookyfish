var Fish = require('./fish');

var school = null;
var feedPoints = [];

module.exports = {
  init: function() {
    school = [];
    for(var i = 0; i < 20; i++) {
      school.push(new Fish({
        restingSpeed: 10,
        startledSpeed: 50
      }));
    }
  },

  tick: function() {
    school.forEach(function(fish) {
      fish.update();
    });
  },

  all: function() {
    return school;
  },

  get: function(i) {
    return school[i];
  },

  addFeedPoint: function(x, age) {
    feedPoints.push({
      x: x,
      age: age || 60 * 5
    });
  },

  setFeedPoints: function(newFeedPoints) {
    feedPoints = newFeedPoints;
  },

  serialize: function() {
    return {
      feedPoints: feedPoints,
      fish: school.map(function(fish) {
        return fish.serialize();
      })
    };
  }
};
