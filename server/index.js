var http = require('http');
var express = require('express');
var faye = require('faye');
var port = process.env.PORT || 5000;

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

server.listen(port);

console.log('And we\'re ready! Go check out localhost:' + port);
