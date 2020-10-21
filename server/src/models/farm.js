const mongoose = require('mongoose')

const farmSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    produce: {
        type: String,
        required: true
    },

    sellableQuantity: {
        type: Number
      },
      
    city: {
        type: String,
        required: true
    },
    phone_no: {
        type: String,
        required: true
    },
    image: {
        type: String,
      }
});

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm