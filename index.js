// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/build'));

io.on('connection', function (socket) {
  socket.on('move', function (data) {
    socket.broadcast.emit('move', data);
  });

  socket.on('disconnect', function () {
    console.log('disconnect');
  });
});
