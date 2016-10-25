var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var SIZE = 500;
canvas.setAttribute('width', SIZE);
canvas.setAttribute('width', SIZE);

MAX_Y = SIZE;
var flock = new Flock(20, 0, SIZE);
var animate = function() {
  var dt = 1 / 60;

  flock.update(dt);

  // re-render
  ctx.clearRect(0, 0, SIZE, SIZE);
  ctx.fillStyle = 'black';
  for(var i = 0; i < flock.boids.length; i++) {
    ctx.fillRect(flock.boids[i].x, flock.boids[i].y, 2, 2);
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
