const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('Admin', new Schema({
  name:         {
    first:  { type: String, required: true },
    last:   { type: String, required: true }
  },
  email:        { type: String, unique: true, required: true, trim: true, dropDups: true },
  username:     { type: String, unique: true, required: true, trim: true, dropDups: true },
  password:     { type: String, required: true }
}));
