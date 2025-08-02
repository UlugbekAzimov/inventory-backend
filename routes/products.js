const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Mahsulot qo‘shish
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    product.karobkaSoni = Math.ceil(product.soni / product.bittaKarobkada);
    product.summa = product.soni * product.narxi;
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Mahsulotlar ro‘yxati
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ sana: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mahsulotni ayirish (update qilish)
router.patch('/decrease/:id', async (req, res) => {
  try {
    const { amount } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Topilmadi' });

    product.soni -= amount;
    product.karobkaSoni = Math.ceil(product.soni / product.bittaKarobkada);
    product.summa = product.soni * product.narxi;

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
