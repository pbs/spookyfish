var ctx = document.querySelector('canvas').getContext('2d');

MAX_Y = 400;
var flock = new Flock(20, 0, 400);
var animate = function() {
  var dt = 1 / 60;

  flock.update(dt);

  // re-render
  ctx.clearRect(0, 0, 400, 400);
  for(var i = 0; i < flock.boids.length; i++) {
    ctx.fillRect(flock.boids[i].x, flock.boids[i].y, 1, 1);
  }
}
