require('babel-core/register')({
    presets: ['react']
});

var chalk = require('chalk');
var express = require('express');
var { Server } = require('http');
var socketIO = require('socket.io');
var path = require('path');
let app = express()
let http = Server(app)
let io = socketIO(http)


io.on('connection', socket => {
    console.log(chalk.yellow(
      '⚡ New connection!'
    ));
});

app.use(express.static(path.join(__dirname, './public')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

/*
  Start the server
*/
http.listen(8000, () => {
  console.log(chalk.white(
    `☆ listening on localhost:8000`
  ))
})

var testState = 0;
setInterval( function() {
  io.emit('switch', {'state': testState})
  if(testState){
    testState = 0;
  } else {
    testState = 1;
  }
}, 10000);
