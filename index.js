const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));


// array of all lines drawn
var line_history = [];

io.on('connection', onConnection);

function onConnection(socket){
  // first send the history to the new client
  for (var i in line_history) {
    socket.emit('drawing', line_history[i] );
 }
  socket.on('drawing', (data) => {socket.broadcast.emit('drawing', data); line_history.push(data)});
  socket.on('clear', () => {socket.broadcast.emit('clear'); line_history=[];});
  console.log("new connection");
}
http.listen(port, () => console.log('listening on port ' + port));