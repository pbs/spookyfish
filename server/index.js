var express = require('express');
var faye = require('faye');

var app = express();

console.log('Starting express app...');
app.listen(8080);

console.log('Starting up faye...');
var pubsub = new faye.NodeAdapter({
  mount: '/faye',
  timeout: 45,
});

pubsub.attach(app);

console.log('And we\'re ready!');
