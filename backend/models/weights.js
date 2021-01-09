const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weightSchema = new Schema({
  weight: {
    type: Number,
    required: true
  },
  user: {
    type: String,
    required: true
  }
}, {timestamps: true});

const Weight = mongoose.model('Weight', weightSchema);
module.exports = Weight;