var Fish = require('./fish');

var school = null;

module.exports = {
  init: function() {
    school = [];
    for(var i = 0; i < 20; i++) {
      school.push(new Fish({}));
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

  serialize: function() {
    return school.map(function(fish) {
      return fish.serialize();
    });
  }
};
