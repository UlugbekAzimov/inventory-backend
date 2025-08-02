const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/products.js');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB ulanish
mongoose.connect(process.env.MONGODB_URI, {
  
})
.then(() => console.log('MongoDB ulandi'))
.catch(err => console.error('MongoDB xato:', err));

// Marshrutlar
app.use('/api/products', productRoutes);

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Server xatosi" });
  }
});
// Server boshlash
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ishga tushdi: ${PORT}-portda`));

