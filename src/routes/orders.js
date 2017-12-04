const express = require('express');
const Order = require('./../models/Order');
const moment = require('moment');
const app = express.Router();

module.exports = () => {

  app.get('/order/:id', (req, res) => {
    Order.find({ _id: req.params.id }, (err, order) => {
      res.json(order);
    })
  });

  app.post('/makeAnOrder', (req, res) => {
    console.log(req.body);
    let kaki = JSON.parse(req.body);
    console.log(kaki);
      let orderSchema =  new Order({
        user: {
          name: req.body.name,
          last: req.body.last,
          phone: req.body.phone
        },
        cart: req.body.cart,
        address: {
          street: req.body.street,
          city: req.body.city,
          apartment: req.body.apartment,
          enterance: req.body.enterance,
          floor: req.body.floor
        },
        item: req.body.item,
        rest: req.body.rest,
        notes: '',
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


  return app;
}
