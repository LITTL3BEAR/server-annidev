const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true
  },
  price: Number,
  image: String,
  rating: {
    type: Number,
    min: 1,
    max: 5
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
