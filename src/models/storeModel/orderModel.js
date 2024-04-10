const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
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
    set: v => v || 0
  },
  paid: {
    type: Number,
    default: 0,
    set: v => v || 0
  },
  status: {
    type: String,
    enum: ['Ordered', 'Shipped', 'Arrived', 'Ready', 'Cancelled'],
    default: 'Ordered',
    set: v => v || 'Ordered'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
