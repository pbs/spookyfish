var viewport = require('./viewport');
var flock = require('./flock');

var boundingRect = document.body.getBoundingClientRect();
var WIDTH = boundingRect.width;
var HEIGHT = boundingRect.height;

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.setAttribute('width', WIDTH);
canvas.setAttribute('height', HEIGHT);

viewport.setElement(canvas);
viewport.setBoundaries(0, 0, WIDTH, HEIGHT);

flock.init(WIDTH);
flock.addAttractor(250, 250, 50, 0.25);

for(var i = 0; i < WIDTH; i += 10) {
  flock.addRepeller(i, WIDTH, WIDTH * 0.01, 10);
}

var animate = function() {
  flock.tick();

  // re-render
  ctx.clearRect(0, 0, WIDTH, WIDTH);
  ctx.fillStyle = 'black';
  flock
    .boids()
    .filter(viewport.containsBoid)
    .map(viewport.toLocalCoords)
    .forEach(function(boid) {
      ctx.fillRect(boid[0], boid[1], 2, 2);
    });

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
