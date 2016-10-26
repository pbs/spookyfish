var viewport = require('./viewport');
var flock = require('../shared/flock');

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
    flock.tick();

    this.draw();

    requestAnimationFrame(this.update.bind(this));
  },

  draw: function() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = 'black';
    flock
      .boids()
      .filter(viewport.containsBoid)
      .map(viewport.toLocalCoords)
      .forEach(function(boid) {
        ctx.fillRect(boid[0], boid[1], 2, 2);
      });
  },
};
