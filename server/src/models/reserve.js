const mongoose = require('mongoose');

const { Schema } = mongoose;
const reserveSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  startAt: {
    type: String,
    required: true,
    trim: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  requestedQuantity: {
    type: Number,
    required: true,
  },
  total: {
    type: Number
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  farmId: {
    type: Schema.Types.ObjectId,
    ref: 'Farm',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: String
  },
  checkin: {
    type: Boolean,
    default: false,
  },
});

const Reserve = mongoose.model('Reserve', reserveSchema);

module.exports = Reserve;
