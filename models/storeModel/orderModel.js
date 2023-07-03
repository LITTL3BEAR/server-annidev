const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  customer: {
    type: mongoose.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    default: 0,
    required: true
  },
  paid: {
    type: Number,
    default: 0,
    required: true
  },
  status: {
    type: String,
    enum: ['Ordered', 'Shipped', 'Arrived', 'Ready', 'Cancelled'],
    default: 'Ordered',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
