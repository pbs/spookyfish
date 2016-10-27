var Fish = require('./fish');

var school = null;
var feedPoints = null;

module.exports = {
  init: function() {
    school = [];
    feedPoints = [];
    for(var i = 0; i < 20; i++) {
      school.push(new Fish({
        restingSpeed: 10,
        startledSpeed: 50,
        minX: 0,
        minY: 0,
        maxX: 1000,
        maxY: 1000
      }));
    }
  },

  tick: function() {
    school.forEach(function(fish) {
      fish.update();
      fish.approachFeedPoints(feedPoints);
    });

    // Apply feed point aging
    feedPoints.forEach(function(feedPoint) {
      feedPoint.age--;
    });
    feedPoints = feedPoints.filter(function(feedPoint) {
      return feedPoint.age != 0;
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

  getFeedPoints: function() {
    return feedPoints;
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
