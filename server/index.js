var http = require('http');
var express = require('express');
var faye = require('faye');
var schoolManager = require('./school-manager');

console.log('Starting express app...');
var app = express();
var server = http.createServer(app);

app.use(express.static('public'));

console.log('Starting up faye...');
var pubsub = new faye.NodeAdapter({
  mount: '/faye',
  timeout: 45,
});
pubsub.attach(server);

server.listen(process.env.PORT || 8080);
 
console.log('Starting school manager');
schoolManager.init(pubsub.getClient(), 500, 500);

console.log('And we\'re ready! Go check out localhost:8080');
