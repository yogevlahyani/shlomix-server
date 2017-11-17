const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('User', new Schema({
  name:         { type: String, required: true },
  device_info:  { type: Object },
  phone:        { type: String, required: true },
  address:      { type: String, required: true },
  apartment:    { type: String, required: true },
  entrance:     { type: String, required: true }
}));
