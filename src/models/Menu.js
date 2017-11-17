const mongoose = require('mongoose');
const moment = require('moment');
const { Schema } = mongoose;

module.exports = mongoose.model('Menu', new Schema({
  name:         { type: String, required: true },
  description:  { type: String, default: null },
  price:        { type: Number, required: true },
  item:         { type: Schema.Types.ObjectId, ref: 'Item', required: true },
  created:      { type: Date, default: moment() }
}));
