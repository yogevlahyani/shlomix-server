const mongoose = require('mongoose');
const moment = require('moment');
const { Schema } = mongoose;

module.exports = mongoose.model('Item', new Schema({
  name:         { type: String, required: true },
  description:  { type: String, default: null },
  iconURL:      { type: String, default: null },
  kosher:       { type: Boolean, default: false },
  category:     [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
  workHours:    { type: Array },
  isVIP:        { type: Boolean, default: false },
  created:      { type: Date, default: moment() }
}));
