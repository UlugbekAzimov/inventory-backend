const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  name: { type: String, required: true },
  box_count: { type: Number, required: true, min: 0 },
  units_per_box: { type: Number, required: true, min: 1 },
  total_units: { type: Number, required: true, min: 0 },
  price_per_unit: { type: Number, required: true, min: 0 },
  total_price: { type: Number, required: true, min: 0 },
  expiration_date: { type: Date, required: true },
  image: { type: String },
  barcode: { type: String },  // **Barcode bu yerda string**
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
