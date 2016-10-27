var school = require('../shared/school');

module.exports = {
  init: function() {
    document.querySelector('canvas').addEventListener('click', this.onClick);
  },

  onClick: function(evt) {
    school.addFeedPoint(evt.clientX);
  }
};
