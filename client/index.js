var viewport = require('./viewport');
var school = require('./school');
var sub = require('./sub');
var messages = require('./messages');
var tankSync = require('./tank-sync');
var animate = require('./animate');
var interaction = require('./interaction');
//var PIXI = require('pixi.js');

var boundingRect = document.body.getBoundingClientRect();
var WIDTH = boundingRect.width;
var HEIGHT = boundingRect.height;

//var canvas = document.querySelector('canvas');
//canvas.setAttribute('width', WIDTH);
//canvas.setAttribute('height', HEIGHT);


school.init();
sub.init();
messages.init();
tankSync.init();
animate.load(function() {
  interaction.init();
});
//requestAnimationFrame(animate.update.bind(animate));
