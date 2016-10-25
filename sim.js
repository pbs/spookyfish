var boids = require('boids');

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var SIZE = 500;
canvas.setAttribute('width', SIZE);
canvas.setAttribute('width', SIZE);

var flock = boids({
  boids: 200,              // The amount of boids to use 
  speedLimit: 2,          // Max steps to take per tick 
  accelerationLimit: 0.1,   // Max acceleration per tick 
  separationDistance: 60, // Radius at which boids avoid others 
  alignmentDistance: 180, // Radius at which boids align with others 
  choesionDistance: 180,  // Radius at which boids approach others 
  separationForce: 0.15,  // Speed to avoid at 
  alignmentForce: 0.25,   // Speed to align with other boids 
  choesionForce: 0.1,     // Speed to move towards other boids 
  attractors: [
    [SIZE / 2, SIZE / 2, 50, 0.25]
  ]
});

flock.boids.forEach(function(boid) {
  boid[0] = Math.random() * SIZE;
  boid[1] = Math.random() * SIZE;
});

var animate = function() {
  flock.tick();

  // re-render
  ctx.clearRect(0, 0, SIZE, SIZE);
  ctx.fillStyle = 'black';
  flock.boids.forEach(function(boid) {
    ctx.fillRect(boid[0], boid[1], 2, 2);
  });

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
