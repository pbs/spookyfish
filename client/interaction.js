var school = require('../shared/school');
var messages = require('./messages');

module.exports = {
  init: function() {
    document.querySelector('canvas').addEventListener('click', this.onClick);
  },

  onClick: function(evt) {
    school.addFeedPoint(evt.clientX);

    // now publish to the server
    messages.publish({
      type: 'feedPoint',
      x: evt.clientX
    });
  },
};
