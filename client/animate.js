var viewport = require('./viewport');
var school = require('../shared/school');

var boundingRect;
var WIDTH;
var HEIGHT;
var ctx;

module.exports = {
  init: function() {
    var canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');

    boundingRect = document.body.getBoundingClientRect();
    WIDTH = boundingRect.width;
    HEIGHT = boundingRect.height;
  },

  update: function() {
    school.tick();

    this.draw();

    requestAnimationFrame(this.update.bind(this));
  },

  draw: function() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = 'black';
    school
      .all()
      //.filter(viewport.containsBoid)
      //.map(viewport.toLocalCoords)
      .forEach(function(fish) {
        ctx.fillRect(fish.x, fish.y, 4, 4);
      });
  },
};
