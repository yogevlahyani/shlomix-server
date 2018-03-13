const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('Deal', new Schema({
  logoUrl:  { type: String },
  title:    { type: String, required: true },
  content:  { type: String, required: true },
  price:    { type: Number, required: true },
  discount: { type: Number },
  created:  { type: Date, default: Date.now() },
  active:   { type: Boolean, required: true },
  item:     { type: Schema.Types.ObjectId, ref: 'Item', required: true }
}));
