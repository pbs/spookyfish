var config = require('./config');
var Fish = require('./fish');

var school = null;
var feedPoints = null;

module.exports = {
  // creates a new school of fish
  init: function() {
    school = [];
    feedPoints = [];
    for(var i = 0; i < 20; i++) {
      school.push(new Fish());
    }
  },

  // does a single tick of the clock: 1 / 60
  tick: function() {
    // update positions of all the fish, and do any adjustments to the fish to go after food
    school.forEach(function(fish) {
      fish.update();
      fish.approachFeedPoints(feedPoints);
    });

    // Age the feed points and make them disappear if needed
    feedPoints.forEach(function(feedPoint) {
      feedPoint.age--;
    });
    feedPoints = feedPoints.filter(function(feedPoint) {
      return feedPoint.age != 0;
    });
  },

  // gets all school members
  all: function() {
    return school;
  },

  // gets a single school member
  get: function(i) {
    return school[i];
  },

  // adds a new feeding point
  addFeedPoint: function(x, age) {
    feedPoints.push({
      x: x,
      age: age || 60 * 5
    });
  },

  // rewrites the entire feeding point array (with server data probably)
  setFeedPoints: function(newFeedPoints) {
    feedPoints = newFeedPoints;
  },

  // gets the raw array of feed points
  getFeedPoints: function() {
    return feedPoints;
  },

  // serializes the school of fish into JSON data for WebSocket fun
  serialize: function() {
    return {
      feedPoints: feedPoints,
      fish: school.map(function(fish) {
        return fish.serialize();
      })
    };
  }
};
