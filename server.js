const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth'); // 🟢 YANGI

app.use('/api/products', productRoutes);
app.use('/api', authRoutes); // 🟢 /api/login endi shu orqali ishlaydi

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB ulandi'))
  .catch(err => console.error('MongoDB ulanishda xatolik:', err));

app.listen(5000, () => console.log('Server 5000-portda'));
