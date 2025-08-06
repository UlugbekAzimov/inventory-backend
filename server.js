const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

// MongoDB ulanishi
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB ulandi'))
.catch((err) => console.error('MongoDB ulanishda xatolik:', err));

// 🔽 Bu joy muhim!
app.get('/', (req, res) => {
  res.send('Server ishlayapti!');
});

// Serverni ishga tushurish
app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishlayapti`);
});
