var school = require('./school');
var viewport = require('./viewport');
var messages = require('./messages');

module.exports = {
  init: function() {
    document.querySelector('canvas').addEventListener('click', this.onClick);
  },

  onClick: function(evt) {
    var globalCoords = viewport.toGlobalCoords({
      x: evt.clientX,
      y: evt.clientY
    });
    
    school.addFeedPoint(globalCoords.x);

    // now publish to the server
    messages.publish({
      type: 'feedPoint',
      x: globalCoords.x
    });
  },
};
