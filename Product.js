const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  quantity: { type: Number, default: 0 },
  perBox: { type: Number, default: 1 },
  price: { type: Number, default: 0 },
  expiryDate: { type: String },
  barcode: { type: String },
  image: { type: String },
  serialNumber: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Product', productSchema);
