const { response } = require("../app");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/ApiFeatures");

//create product --admin
exports.createProduct = catchAsyncError(async(request, response, next)=>{
    request.body.user = request.user.id;
    
    const product = await Product.create(request.body);
    response.status(201).json({
        success: true, 
        product
    })
});

//get all products
exports.getAllProducts = catchAsyncError(async (request, response, next) =>{
    const resultPerPage = 9;
    const productsCount = await Product.countDocuments(); 

    const apiFeature = new ApiFeatures(Product.find(), request.query)
        .search()
        .filter()
        //.pagination()
        let products = await apiFeature.query;
        let filteredProductsCount = products.length;
        apiFeature.pagination(resultPerPage);
    
    //const products = await apiFeature.query;
    response.status(200).json({
        success: true, 
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount
    })
});

//update product --admin
exports.updateProduct = catchAsyncError(async(request, response, next)=>{
    let product = await Product.findById(request.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found", 500));
    }

    product = await Product.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
        runValidators: true, 
        useFindAndModify: false
    });

    response.status(200).json({
        success: true, 
        product
    })
});

//delete product --admin
exports.deleteProduct = catchAsyncError(async(request, response, next)=>{
    const product = await Product.findById(request.params.id);

    if(!product){
        return next(new ErrorHandler("Product Not Found", 500));
    }
    await product.remove();

    response.status(200).json({
        success: true,
        message: "Product Deleted Successfully"
    })
});

//Get single product or get product details
exports.getProductDetails = catchAsyncError(async (request, response, next) =>{
    const product = await Product.findById(request.params.id);

    if(!product){
        return next(new ErrorHandler("Product Not Found", 404));
    }

    response.status(200).json({
        success: true,
        product,
    });
});

//Create new review or update the review
exports.createProductReview = catchAsyncError(async (request, response, next) =>{
    const {rating, comment, productId} = request.body;

    const review = {
        user: request.user._id,
        name: request.user.name,
        rating: Number(rating),
        comment
    };

    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find((rev) => rev.user.toString() === request.user._id.toString());
    
    if(isReviewed){
        product.reviews.forEach((rev) =>{
            if(rev.user.toString() === request.user._id.toString())
            (rev.rating = rating),
            (rev.comment = comment);
        }); 
    }
    else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach((rev) =>{
        avg += rev.rating;
    });
    console.log(avg);
    product.ratings = avg / product.reviews.length;

    await product.save({validateBeforeSave: false});

    response.status(200).json({
        success: true
    });
});

//Get all reviews of a product
exports.getProductReviews = catchAsyncError(async (request, response, next) => {
    const product = await Product.findById(request.query.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    response.status(200).json({
        success: true,
        reviews: product.reviews
    });
});

//Delete review
exports.deleteReview = catchAsyncError(async (request, response, next) => {
    const product = await Product.findById(request.query.productId);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== request.query.id.toString()
    );
    
    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    const ratings = avg / reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(request.query.productId, {
        reviews, 
        ratings, 
        numOfReviews},
        {
            new: true, 
            runValidators:true,
            useFindAndModify: false
        });
    response.status(200).json({
        success: true,
    });
});