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

let SWITCH_READ_INTERVAL = 5000; //in ms

var ServerConfig = {
  devModeNotPi: false,
  testing: false,
  switchPin: 2
};

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
    `☆ listening on port 8000`
  ))
})

if(ServerConfig.testing){
  var testState = 0;
  setInterval( function() {
    io.emit('switch', {'state': testState})
    if(testState){
      testState = 0;
    } else {
      testState = 1;
    }
  }, 10000);  
} 

if (!ServerConfig.devModeNotPi) {
  var Gpio = require('onoff').Gpio;
  var Switch = new Gpio(ServerConfig.switchPin, 'in', 'both');
  Switch.watch(function(err,value){  
    if(err){
      console.log(err);
    } else {
      if(value == 0){
        io.emit('switch', {'state': 0});
      } else {
        io.emit('switch', {'state': 1});
      }
    }
  });

  setInterval( function() {
    Switch.readSync(function(err,value){  
      if(err){
        console.log(err);
      } else {
        if(value == 0){
          io.emit('switch', {'state': 0});
        } else {
          io.emit('switch', {'state': 1});
        }
      }
    });
  }, SWITCH_READ_INTERVAL);  

}

process.on('SIGINT', function(){
  if(Switch){
    Switch.unexport();
  }
});

