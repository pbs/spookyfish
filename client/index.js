var flock = require('./flock');

var SIZE = 500;
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.setAttribute('width', SIZE);
canvas.setAttribute('width', SIZE);

flock.init(SIZE);

var animate = function() {
  flock.tick();

  // re-render
  ctx.clearRect(0, 0, SIZE, SIZE);
  ctx.fillStyle = 'black';
  flock.boids().forEach(function(boid) {
    ctx.fillRect(boid[0], boid[1], 2, 2);
  });

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
