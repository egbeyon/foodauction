const mongoose = require('mongoose');

const { Schema } = mongoose;
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  image: {
    type: String,
  },
  typo: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    trim: true,
    lowercase: true,
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true
  }
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
