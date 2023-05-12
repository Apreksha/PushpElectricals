const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:{
        type: String, 
        required: [true, "Please enter product name"],
        trim: true,
    },
    description:{
        type: Array, 
        required: [true, "Please enter product description"]
    },
    technicalDetails: {
        type: Array, 
    },
    price:{
        type: Number, 
        required: [true, "Please enter product price"]
    },
    ratings:{
        type: Number, 
        default: 0
    },
    images:{
        type: Array, 
    },
    category:{
        type: String, 
        required: [true, "Please enter product category"]
    },
    stock:{
        type: Number,
        required: [true, "Please enter product stock"],
        default: 1
    },
    numOfReviews:{
        type: Number,
        default:0
    },
    reviews:[{
        user:{
            type: mongoose.Schema.ObjectId,
            ref:"User",
            required: true,
        },
        name: {
            type: String, 
            required: true
        },
        rating:{
            type: Number, 
            required: true
        },
        comment:{
            type: String, 
            required: true 
        }
    }],
})

module.exports = mongoose.model("Product", productSchema);