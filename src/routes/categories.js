const express = require('express');
const Category = require('./../models/Category');
const moment = require('moment');
const app = express.Router();

module.exports = () => {
  app.get('/', (req, res) => {
    Category.find({}, (err, cats) => {
      if(err) throw err;
      res.json(cats);
    });
  });

  app.post('/addCategory', (req, res) => {
    Category.findOne({ name: req.body.name }, (err, cats) => {
      if(err) throw err;

      console.log(cats);

      if(!cats) {
        new Category({
          name: req.body.name,
          creared: moment()
        }).save(() => {
          res.json({
            feedback: 'הקטגוריה נוספה בהצלחה!',
            type: 'success'
          });
        });
      } else {
        res.json({
          feedback: 'קטגוריה עם שם זה קיימת כבר',
          type: 'error'
        });
      }
    });
  });

  app.post('/updateCategory', (req, res) => {
    Category.findOne({ _id: req.body.id }, (err, cat) => {
      if (err) throw err;

      req.body.iconURL ? cat.iconURL = req.body.iconURL : null
      req.body.name ? cat.name = req.body.name: null;
      cat.save((error, updatedCategory) => {
        if (err) throw err;
        res.json({
          updatedCategory,
          feedback: 'קטגוריית ' + updatedCategory.name + ' התעדכנה בהצלחה!',
          type: 'success'
        });
      });
    });
  });

  app.post('/deleteCategory', (req, res) => {
    Category.remove({ _id: req.body.id }, (err, cats) => {
      if(err) throw err;

      res.json({
        feedback: 'קטגוריה נמחקה בהצלחה!',
        type: 'success'
      });
    });
  });


  return app;
}
