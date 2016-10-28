var school = require('../shared/school');
var viewport = require('./viewport');
var messages = require('./messages');

module.exports = {
  init: function() {
    document.querySelector('canvas').addEventListener('click', this.onClick);
  },

  onClick: function(evt) {
    school.addFeedPoint(evt.clientX);

    var globalCoords = viewport.toGlobalCoords({
      x: evt.clientX,
      y: evt.clientY
    });

    // now publish to the server
    messages.publish({
      type: 'feedPoint',
      x: globalCoords.x
    });
  },
};
