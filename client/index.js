var viewport = require('./viewport');
var flock = require('./flock');
var animate = require('./animate');

var boundingRect = document.body.getBoundingClientRect();
var WIDTH = boundingRect.width;
var HEIGHT = boundingRect.height;

var canvas = document.querySelector('canvas');
canvas.setAttribute('width', WIDTH);
canvas.setAttribute('height', HEIGHT);

viewport.setElement(canvas);
viewport.setBoundaries(0, 0, WIDTH, HEIGHT);

flock.init(WIDTH);
flock.addAttractor(250, 250, 50, 0.25);

for(var i = 0; i < WIDTH; i += 10) {
  flock.addRepeller(i, WIDTH, WIDTH * 0.01, 10);
}

animate.init();
requestAnimationFrame(animate.update.bind(animate));
