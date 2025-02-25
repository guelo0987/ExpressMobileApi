const express = require("express")
const Product = require("../Models/product")

const productRouter = express.Router()

productRouter.post("/api/add-product", async (req, res) => {
    try {
        const {productname, productPrice, quantity, description, category, subCategory, images} = req.body
        const product = new Product({productname, productPrice, quantity, description, category, subCategory, images})
        await product.save()
        return res.status(201).send(product)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})


productRouter.get("/api/popular-products", async (req, res) => {
    try {
       const products = await Product.find({popular:true})
       if(!products || products.length == 0){
        return res.status(404).json({msg: "Products not found"})
       } else{
        return res.status(200).json({products})
       }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})


productRouter.get("/api/recommended-products", async (req, res) => {
    try {
       const products = await Product.find({recommend:true})
       if(!products || products.length == 0){
        return res.status(404).json({msg: "Products not found"})
       } else{
        return res.status(200).json({products})
       }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})


module.exports = productRouter