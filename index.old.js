'use strict';

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const app = express();

const config = require('./src/config');
// Models
const Category = require('./src/models/Category');
const Item = require('./src/models/Item');
const Menu = require('./src/models/Menu');

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

mongoose.connect(config.url, { useMongoClient: true });

wss.on('connection', function connection(ws, req) {
  //const location = url.parse(req.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});

app.set('json spaces', 4);
app.use(bodyParser.json());

app.use('/', (req, res) => {
  let html = "<h1>Hello World!</h1>";
  res.send(html);
});
app.use('/categories', require('./src/routes/categories')());
app.use('/items', require('./src/routes/items')());
//app.use('/menu', require('./src/routes/menu')(db));

server.listen(PORT, () => console.log('Listening on port ' + PORT));
