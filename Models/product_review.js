const mongoose = require("mongoose")

const productReviewSchema = mongoose.Schema({
    buyerId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    reting: {
        type: Number,
        required: true
    },
    review:{
        type: String,
        required: true
    }
})

const ProductReview = mongoose.model("ProductReview", productReviewSchema)

module.exports = ProductReview