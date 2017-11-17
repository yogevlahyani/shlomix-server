const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('Category', new Schema({
  name:     { type: String, required: true },
  iconURL:  { type: String, default: null },
  created:  { type: Date, default: Date.now() }
}));
