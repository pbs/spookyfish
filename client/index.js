var viewport = require('./viewport');
var flock = require('./flock');

var SIZE = 500;
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.setAttribute('width', SIZE);
canvas.setAttribute('width', SIZE);

viewport.setElement(canvas);
viewport.setBoundaries(200, 200, 300, 300);

flock.init(SIZE);
flock.addAttractor(250, 250, 50, 0.25);

for(var i = 0; i < SIZE; i += 10) {
  flock.addRepeller(i, SIZE, SIZE * 0.01, 10);
}

var animate = function() {
  flock.tick();

  // re-render
  ctx.clearRect(0, 0, SIZE, SIZE);
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
