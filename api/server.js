require(`babel-core/register`)

import chalk from 'chalk'
import express from 'express'
import { Server } from 'http'
import socketIO from 'socket.io'
import source from './src'

let app = express()
let http = Server(app)
let io = socketIO(http)

source({ io })

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