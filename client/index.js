var viewport = require('./viewport');
var school = require('../shared/school');
var messages = require('./messages');
var flockSync = require('./flock-sync');
var animate = require('./animate');

var boundingRect = document.body.getBoundingClientRect();
var WIDTH = boundingRect.width;
var HEIGHT = boundingRect.height;

var canvas = document.querySelector('canvas');
canvas.setAttribute('width', WIDTH);
canvas.setAttribute('height', HEIGHT);

var screenPosition = Number(location.hash.substring(1))
if(isNaN(screenPosition)) {
  screenPosition = 0;
}
var screenLeft = screenPosition * 250;
var screenRight = screenLeft + 250;

viewport.setElement(canvas);
viewport.setBoundaries(0, screenLeft, HEIGHT, screenRight);
window.viewport = viewport;

school.init();

messages.init();
flockSync.init();

animate.init();
requestAnimationFrame(animate.update.bind(animate));
