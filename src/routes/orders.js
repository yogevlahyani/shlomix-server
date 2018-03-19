const express = require('express');
const Order = require('./../models/Order');
const moment = require('moment');
const app = express.Router();

module.exports = () => {

  app.get('/order/:id', (req, res) => {
    Order.find({ _id: req.params.id, status: 0 }, (err, order) => {
      if (err) throw err;

      if (order) { res.json(order); }
    });
  });

  app.post('/makeAnOrder', (req, res) => {
      console.log(req.body.cart);
      let card = JSON.parse(req.body.cart);
      let orderSchema =  new Order({
        user: {
          name: req.body.name,
          phone: req.body.phone
        },
        cart: card,
        address: {
          street: req.body.street,
          city: req.body.city,
          apartment: req.body.apartment,
          enterance: req.body.enterance,
          floor: req.body.floor
        },
        item: req.body.item,
        rest: req.body.rest,
        notes: req.body.notes,
        total: req.body.total,
        hurry: req.body.hurry,
        created: moment()
      });

      console.log(req.body);

        orderSchema.save((err, order) => {
          if (err) console.log(err);
          res.send(order);
        });
    });

    app.post('/archiveThatOrder', (req, res) => {
      Order.findOne({ _id: req.body.orderID }, (err, order) => {
        if(order) {
          order.status = req.body.status;
          order.save((err, success) => {
            if(err) throw err;
            res.json(success);
          });
        } else {
          res.send('cannot find order');
        }
      });
    });

    app.post('/killOrder', (req, res) => {
      Order.remove({ _id: req.body.orderID }, (err, order) => {
        if (err) throw err;
        if(order) {
          res.json(order);
        }
      });
    });

    app.post('/hurryUp', (req, res) => {
      Order.findById(req.body.orderId, (err, order) => {
        if (err) throw err;

        if (!order.hurry) {
          order.hurry = true;
          let orderCreated = moment(order.created).subtract(10, 'minutes');
          order.created = moment(orderCreated);
          order.total = order.total + 5;

          order.save(function (error, updatedOrder) {
            if (error) throw error;

            res.json(updatedOrder);
          });
        } else {
          res.json({
            'error': true
          });
        }

      });
    });


  return app;
}
