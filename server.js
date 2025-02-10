require('dotenv').config();
const express = require('express');
const connectDB = require('./Context/db');
const authRoutes = require('./Routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth', authRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});