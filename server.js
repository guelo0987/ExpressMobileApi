require('dotenv').config();
const express = require('express');
const connectDB = require('./Context/db');
const authRoutes = require('./Routes/auth');
const bannerRouter = require('./Controllers/banner');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(bannerRouter);

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});