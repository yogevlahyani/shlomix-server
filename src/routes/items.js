const express = require('express');
const Category = require('./../models/Category');
const Item = require('./../models/Item');
const Menu = require('./../models/Menu');
const app = express.Router();

module.exports = () => {
  app.get('/', (req, res) => {
    Item.find({} ,(err, items) => {
      if(err) throw err;

      res.json(items);
    });
  });

  app.get('/byItemId/:id', (req, res) => {
    Item.find({ _id: req.params.id } ,(err, items) => {
      if(err) throw err;

      res.json(items);
    });
  });

  app.get('/byCategory/:id', (req, res) => {
    Item.find({ category: req.params.id } ,(err, items) => {
      if(err) throw err;

      res.json(items);
    });
  });

  app.post('/addItem', (req, res) => {
    Category.findById(req.body.catID, (err, cat) => {
      if(err) throw err;

      if(cat) {
        new Item({
          name:         req.body.name,
          description:  req.body.description,
          category:     [cat._id],
          workHours:    req.body.workHours,
          isVIP:        req.body.isVIP,
          iconURL:      req.body.iconURL,
          kosher:       req.body.kosher
        }).save((err, item) => {
          if(err) throw err;
          res.json({
            item,
            feedback: 'המסעדה נוספה בהצלחה!',
            type: 'success'
          });
        });
      }

    });
  });

  app.post('/updateItem', (req, res) => {
    Item.findOne({ _id: req.body.id }, (err, item) => {
      if (err) throw err;

      req.body.iconURL ? item.iconURL = req.body.iconURL : null
      req.body.name ? item.name = req.body.name: null;
      req.body.workHours ? item.workHours = req.body.workHours;
      req.body.description ? item.description = req.body.description: null;
      item.isVIP = req.body.isVIP;
      item.kosher = req.body.kosher;
      item.save((error, updatedItem) => {
        if (err) throw err;
        res.json({
          updatedItem,
          feedback: 'מסעדת ' + updatedItem.name + ' התעדכנה בהצלחה!',
          type: 'success'
        });
      });
    });
  });

  app.post('/killItem', (req, res) => {
    Item.remove({ _id: req.body.itemID }, (err, item) => {
      if (err) throw err;
      if(item) {
        res.json({
          feedback: 'המסעדה נמחקה בהצלחה!',
          type: 'success'
        });
      }
    });
  });


  return app;
}
