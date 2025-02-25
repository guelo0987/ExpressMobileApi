const express = require("express");
const SubCategory = require("../Models/sub_category");

const subCategoryRouter = express.Router()

subCategoryRouter.post("/api/subcategories", async (req, res)=>{
    try {
         const {categoryId, categoryName, image, subCategoryName} = req.body
         const subCategory = new SubCategory({categoryId, categoryName, image, subCategoryName})
         await subCategory.save()
         return res.status(201).send(subCategory)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})


subCategoryRouter.get("/api/category/:categoryName/subcategories", async (req, res) => {
try {
        //extract the categoryName from the request url
        const {categoryName} = req.params
        //get all subcategories
        const subcategories = await SubCategory.find({categoryName:categoryName})
        //check if any subcategories were found
        if(!subcategories || subcategories.length == 0){
            //no subcategories, so respond with status code 404
            return res.status(404).json({mesg: "Subcategories not found"})
        }else{
            return res.status(200).json({subcategories})
        }
} catch (error) {
    res.status(500).json({error: error.message})
}

})


module.exports = subCategoryRouter