const mongoose = require('mongoose');
const moment = require('moment');
const { Schema } = mongoose;

module.exports = mongoose.model('AdditionalSection', new Schema({
  name:         { type: String, required: true },
  menu:         { type: Schema.Types.ObjectId, ref: 'Menu', required: true },
  additionalItem: [{ type: Schema.Types.ObjectId, ref: 'AdditionalItem', required: true }],
  created:      { type: Date, default: moment() }
}));
