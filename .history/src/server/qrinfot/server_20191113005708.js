  
'use strict';

const express = require('express');
const request = require('request');
//const socketIO = require('socket.io');
//const path = require('path');

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*');
 res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  
  next();
});

/*app.get('/jokes/random', (req, res) => {
  request(
    { url: 'https://joke-api-strict-cors.appspot.com/jokes/random' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  )
});*/



const PORT = process.env.PORT || 3000;
//const INDEX = path.join(__dirname, 'index.html');

//const server = express()
//server.use((req, res) => res.sendFile(INDEX) )
var server = app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
var io = require('socket.io').listen(server);
//onst io = socketIO(server);

io.on('connection', (client) => {
  console.log('Client connected');

  client.emit('message', 'Vous êtes bien connecté !');
  client.on('message', (message) => {
    console.log('Un client me parle ! Il me dit : ' + message);
  });	
  /*client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });*/
  client.on('disconnect', () => console.log('Client disconnected'));
});

//setInterval(() => io.emit('time', new Date().toTimeString()), 1000);