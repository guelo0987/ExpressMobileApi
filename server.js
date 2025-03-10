require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./Context/db');
const authRoutes = require('./Routes/auth');
const bannerRouter = require('./Controllers/banner');
const categoriesRouter = require('./Controllers/category');
const SubCategoryRouter = require('./Controllers/sub_category');
const ProductosRouter= require('./Controllers/product');



const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "*", // Puedes cambiar esto a una URL específica si es necesario
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization"
}));


app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(bannerRouter);
app.use(categoriesRouter);
app.use(SubCategoryRouter);
app.use(ProductosRouter);


connectDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});