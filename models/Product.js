const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  tartibRaqami: Number,
  nomi: String,
  soni: Number,
  karobkaSoni: Number,
  bittaKarobkada: Number,
  narxi: Number,
  summa: Number,
  barkod: String,
  yaroqlilik: String,
  sana: { type: Date, default: Date.now },
  kategoriya: String,
  rasm: String
});

module.exports = mongoose.model('Product', productSchema);
