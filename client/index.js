var viewport = require('./viewport');
var flock = require('../shared/flock');
var messages = require('./messages');
var flockSync = require('./flock-sync');
var animate = require('./animate');
//var PIXI = require('pixi.js');

var boundingRect = document.body.getBoundingClientRect();
var WIDTH = boundingRect.width;
var HEIGHT = boundingRect.height;

//var canvas = document.querySelector('canvas');
//canvas.setAttribute('width', WIDTH);
//canvas.setAttribute('height', HEIGHT);

flock.init(WIDTH, HEIGHT);
flock.addAttractor(250, 250, 50, 0.25);
for(var i = 0; i < WIDTH; i += 10) {
  flock.addRepeller(i, WIDTH, WIDTH * 0.01, 10);
}

messages.init();
flockSync.init();

animate.load();
//requestAnimationFrame(animate.update.bind(animate));