const express = require('express');
const Item = require('./../models/Item');
const Menu = require('./../models/Menu');
const AdditionalSection = require('./../models/AdditionalSection');
const AdditionalItem = require('./../models/AdditionalItem');
const app = express();

module.exports = (db) => {

  app.get('/byItem/:itemId', (req, res) => {
    Menu.find({ item: req.params.itemId }, (err, menus) => {
      if(err) throw err;

      if(menus) {
        res.json(menus);
      }
    });
  });

  app.post('/addMenu', (req, res) => {
    Item.findById(req.body.itemId, (err, item) => {
      if(err) throw err;

      if(item) {
        new Menu({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          item: item._id
        }).save((error, menu) => {
          if(error) throw error;
          res.json({
            menu,
            feedback: 'פריט נוסף בהצלחה!',
            type: 'success'
          });
        });
      }
    });
  });

  app.post('/updateItem', (req, res) => {
    Menu.findOne({ _id: req.body.id }, (err, menu) => {
      if (err) throw err;

      console.log(menu);

      menu.name = req.body.name || menu.name;
      menu.description = req.body.description || menu.description;
      menu.price = req.body.price || menu.price;
      menu.item = req.body.itemId || menu.item;
      menu.save((error, updatedMenu) => {
        if (error) throw error;
        res.json({
          updatedMenu,
          feedback: 'הפריט התעדכן בהצלחה!',
          type: 'success'
        });
      });
    });
  });

  app.post('/killItem', (req, res) => {
    Menu.remove({ _id: req.body.menuId }, (err, menu) => {
      if (err) throw err;
      if(menu) {
        res.json({
          feedback: 'המסעדה נמחקה בהצלחה!',
          type: 'success'
        });
      }
    });
  });

  app.post('/additional/section/add', (req, res) => {
    Menu.findById(req.body.menuId, (err, menu) => {
      if(err) throw err;

      if(menu) {
        new AdditionalSection({
          name: req.body.name,
          menu: menu._id
        }).save((error, as) => {
          if(error) throw error;
          res.json({
            as,
            feedback: 'פריט נוסף בהצלחה!',
            type: 'success'
          });
        });
      }
    });
  });

  app.post('/additional/item/add', (req, res) => {
    AdditionalSection.findById(req.body.asId, (err, as) => {
      if(err) throw err;

      res.json(req.body);

      // if(as) {
      //   new AdditionalItem({
      //     name: req.body.name,
      //     description:  req.body.description,
      //     price: req.body.price,
      //     additionalSection: as._id,
      //   }).save((error, ai) => {
      //     if(error) throw error;
      //     res.json({
      //       ai,
      //       feedback: 'פריט נוסף בהצלחה!',
      //       type: 'success'
      //     });
      //   });
      // }
    });
  });

  return app;
}
