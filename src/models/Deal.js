const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('Deal', new Schema({
  title:    { type: String, required: true },
  content:  { type: String, required: true },
  created:  { type: Date, default: Date.now() },
  item:     { type: Schema.Types.ObjectId, ref: 'Item' }
}));
