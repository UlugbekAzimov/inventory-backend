const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Barcha mahsulotlar
router.get('/', async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

/// 🔍 Qidiruv / Filter (narx ham qo‘shilgan)
router.get('/search', async (req, res) => {
  const q = req.query.q || '';
  const regex = new RegExp(q, 'i'); // i - katta/kichik harf farqsiz

  const products = await Product.find({
    $or: [
      { name: regex },
      { category: regex },
      { barcode: regex },
      { serialNumber: regex },
      { price: { $regex: regex } } // narxni ham qidiruvga qo‘shamiz
    ]
  }).sort({ createdAt: -1 });

  res.json(products);
});


// Yangi mahsulot qo‘shish
router.post('/', async (req, res) => {
  const newProduct = new Product(req.body);
  const saved = await newProduct.save();
  res.json(saved);
});

// Tahrirlash
router.put('/:id', async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// O‘chirish
router.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
