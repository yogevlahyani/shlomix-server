const express = require('express');
const Item = require('./../models/Item');
const Deal = require('./../models/Deal');
const app = express.Router();

module.exports = () => {
  app.get('/', (req, res) => {
    Deal.find({}).populate('item').exec((err, items) => {
      if(err) throw err;

      res.json(items);
    });
  });

  app.get('/actives', (req, res) => {
    Deal.find({ active: true }).populate('item').exec((err, items) => {
      if(err) throw err;

      res.json(items);
    });
  });

  app.post('/addDeal', (req, res) => {
    Item.findById(req.body.item, (err, item) => {
      if(err) throw err;

      if(item) {
        new Deal({
          logoUrl:      req.body.logoUrl,
          title:        req.body.title,
          content:      req.body.content,
          price:        req.body.price,
          discount:     req.body.discount,
          item,
          active:       req.body.active
        }).save((err, deal) => {
          if(err) throw err;
          res.json({
            deal,
            feedback: 'המבצע נוסף בהצלחה!',
            type: 'success'
          });
        });
      }

    });
  });

  app.post('/updateDeal', (req, res) => {
    Deal.findOne({ _id: req.body.id }, (err, deal) => {
      if (err) throw err;

      req.body.logoUrl ? deal.logoUrl = req.body.logoUrl : null;
      req.body.title ? deal.title = req.body.title : null;
      req.body.content ? deal.content = req.body.content : null;
      req.body.price ? deal.price = req.body.price : null;
      req.body.discount ? deal.discount = req.body.discount : null;
      req.body.itemId ? deal.item = req.body.itemId : null;

      if (req.body.active === true) {
        Deal.update({}, { active: false }, { multi: true }, function(err, res) {
             if (err) throw err;

             if (res) {
               console.log(res);
             }
         });
        deal.active = req.body.active;
      }

      deal.save((error, updatedDeal) => {
        if (err) throw err;
        res.json({
          updatedDeal,
          feedback: 'המבצע עודכן בהצלחה!',
          type: 'success'
        });
      });
    });
  });

  app.post('/killDeal', (req, res) => {
    Deal.remove({ _id: req.body.dealId }, (err, deal) => {
      if (err) throw err;
      if(deal) {
        res.json({
          feedback: 'המבצע נמחק בהצלחה',
          type: 'success'
        });
      }
    });
  });


  return app;
}
