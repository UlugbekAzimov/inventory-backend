const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Serverda xatolik yuz berdi' });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    data.box_count = Math.ceil(data.total_units / data.units_per_box);
    data.total_price = data.total_units * data.price_per_unit;

    const newProduct = new Product(data);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Qo‘shishda xatolik yuz berdi' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const data = req.body;
    data.box_count = Math.ceil(data.total_units / data.units_per_box);
    data.total_price = data.total_units * data.price_per_unit;

    const updated = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!updated) return res.status(404).json({ message: 'Mahsulot topilmadi' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Yangilashda xatolik yuz berdi' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Mahsulot topilmadi' });
    res.json({ message: 'O‘chirildi' });
  } catch (error) {
    res.status(500).json({ message: 'O‘chirishda xatolik yuz berdi' });
  }
});

module.exports = router;
