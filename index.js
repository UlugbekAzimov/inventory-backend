require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);

// MongoDB Atlas ulanishi
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Atlas bilan ulandi!'))
  .catch(err => console.error('❌ Ulanishda xatolik:', err));

app.listen(5000, () => {
  console.log('🚀 Server 5000-portda ishga tushdi');
});
