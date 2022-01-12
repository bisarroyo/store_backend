const {Schema, model } = require('mongoose');
const boom = require('@hapi/boom');

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    }
  ],
  status: {
    type: String,
    enum: ['pending', 'paid', 'shipped', 'delivered'],
    default: 'pending'
  },
  total: {
    type: Number,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
}
);

const Order = model('order', orderSchema)

module.exports = Order;