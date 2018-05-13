'use strict';

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const app = express();

const config = require('./src/config');
// Models
const Category = require('./src/models/Category');
const Item = require('./src/models/Item');
const Menu = require('./src/models/Menu');
const Order = require('./src/models/Order');

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', function(socket){
  console.log('a user connected');
  setInterval(() => {
    Order.find({})
    .where('status').lt(1)
    .exec((err, orders) => {
      socket.emit('orders', { orders });
    });
  }, 3500);

  socket.on('send msg', (data) => {
    console.log(data);
    io.sockets.emit('new msg', {msg: data});
  });
});

mongoose.connect(config.url, { useMongoClient: true });

app.set('json spaces', 4);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use('/admins', require('./src/routes/admins')());
app.use('/orders', require('./src/routes/orders')());
app.use('/categories', require('./src/routes/categories')());
app.use('/items', require('./src/routes/items')());
app.use('/menu', require('./src/routes/menu')());
app.use('/deals', require('./src/routes/deals')());

app.get('/kaki', (req, res) => {
  res.send('ESH!!s KAKI !@#');
});

server.listen(PORT, () => console.log('Listening on port ' + PORT));
