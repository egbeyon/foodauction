const mongoose = require('mongoose');

const { Schema } = mongoose;
const hotbuySchema = new Schema({
  startAt: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
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
  quantity: { type: Number},

  metric: { type: String}
}, {timestamps: true});

const Hotbuy = mongoose.model('Hotbuy', hotbuySchema);

module.exports = Hotbuy;
