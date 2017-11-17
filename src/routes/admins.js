const express = require('express');
const bcrypt = require('bcrypt');
const Admin = require('./../models/Admin');
const app = express.Router();

module.exports = () => {

  app.post('/login', (req, res) => {
    Admin.findOne({ username: req.body.username }, (err, user) => {
      if (err) throw err;

      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (result === true) {
            res.json({
              login: true,
              user: {
                id: user._id,
                name: user.name
              }
            });
          } else {
            res.json({
              login: false
            });
          }
        });
      } else {
        res.json({
          login: false
        });
      }

    });
  });

  app.post('/addAdmin', (req, res) => {
    if (req.body.firstName &&
      req.body.lastName &&
      req.body.email &&
      req.body.username &&
      req.body.password) {

      var adminData = {
        name: {
          first: req.body.firstName,
          last: req.body.lastName
        },
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      }

      Admin.findOne({$or: [
        { email: adminData.email },
        { username: adminData.phone }
      ]}, (err, admin) => {
        if(err) throw err;
        if(!admin) {
          Admin.create(adminData, (err, user) => {
            if (err) {
              throw err;
            }

            bcrypt.hash(user.password, 10, (error, hash) => {
              if (error) {
                throw error;
              }

              user.password = hash;
              user.save(() => {
                res.send(user);
              });

            });
          });
        } else {
          res.json({
            error: 'משתמש קיים עם שם המשתמש או האימייל'
          });
        }
      })
    }
  });


  return app;
}
