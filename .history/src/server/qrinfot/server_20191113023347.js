
'use strict';

const express = require('express');
const request = require('request');

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

  next();
});
app.get('/', function (req, res) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

  request(
    { url: 'https://joke-api-strict-cors.appspot.com/jokes/random' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  )
});

const PORT = process.env.PORT || 3000;

var server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
var io = require('socket.io').listen(server);

io.on('connection', (client) => {
  console.log('Client connected');

  client.emit('message', 'Vous êtes bien connecté !');
  client.on('messaged', (messaged) => {
    console.log('Un client me parle ! Il me dit : ' + messaged);
    client.emit('message', 'Le client à envoye le message' + messaged);
  });

  client.on('disconnect', () => console.log('Client disconnected'));
});
