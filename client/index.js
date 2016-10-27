var viewport = require('./viewport');
var school = require('../shared/school');
var messages = require('./messages');
var schoolSync = require('./school-sync');
var animate = require('./animate');
//var PIXI = require('pixi.js');

var boundingRect = document.body.getBoundingClientRect();
var WIDTH = boundingRect.width;
var HEIGHT = boundingRect.height;

//var canvas = document.querySelector('canvas');
//canvas.setAttribute('width', WIDTH);
//canvas.setAttribute('height', HEIGHT);

school.init();

messages.init();
schoolSync.init();

animate.load();
//requestAnimationFrame(animate.update.bind(animate));