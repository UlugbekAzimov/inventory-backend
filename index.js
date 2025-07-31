const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const productRoutes = require('./routes/products');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/products', productRoutes);

// MongoDB ulanish
mongoose.connect('mongodb://localhost:27017/inventory', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB ulandi'))
  .catch((err) => console.error('MongoDB xatolik:', err));

app.listen(PORT, () => console.log(`Server ${PORT}-portda ishga tushdi`));
