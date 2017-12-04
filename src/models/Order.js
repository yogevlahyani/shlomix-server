const mongoose = require('mongoose');
const moment = require('moment');
const { Schema } = mongoose;

module.exports = mongoose.model('Order', new Schema({
  user:     {
    name: { type: String, required: true },
    last: { type: String, required: true },
    phone: { type: String, required: true }
  },
  cart:     { type: Array, required: true },
  address:  {
    street:     { type: String, required: true },
    city:       { type: String, required: true },
    apartment:  { type: Number, required: true },
    enterance:  { type: Number, required: true },
    floor:      { type: Number, required: true }
  },
  item:     { type: Schema.Types.ObjectId, ref: 'Item', required: true },
  rest:     { type: String },
  notes:    { type: String },
  created:  { type: Date, default: moment() },
  hurry:    { type: Boolean, default: false },
  total:    { type: Number, required: true },
  status:   { type: Number, default: 0}
}));
