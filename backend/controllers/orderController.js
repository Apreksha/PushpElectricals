const { json } = require("body-parser");
const catchAsyncError = require("../middleware/catchAsyncError");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");

//create new order
exports.newOrder = catchAsyncError(async (request, response, next) => {
    const {
        shippingInfo, 
        orderItems, 
        //paymentInfo, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice 
    } = request.body;

    const order = await Order.create({
        shippingInfo, 
        orderItems, 
        //paymentInfo, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice,
        paidAt: Date.now(),
        user: request.user._id
    });

    response.status(201).json({
        success: true,
        order
    });
});

//get single order
exports.getSingleOrder = catchAsyncError(async (request, response, next) => {
    const order = await Order.findById(request.params.id).populate(
        "user",
        "name email"
    );

    if(!order){
        return next(new ErrorHandler("Order not found with this id", 404));
    }

    response.status(200).json({
        success: true,
        order
    });
});

//get logged in user orders
exports.myOrders = catchAsyncError(async (request, response, next) => {
    const orders = await Order.find({user: request.user._id});
    response.status(200).json({
        success: true,
        orders
    });
});

//get all orders --admin
exports.getAllOrders = catchAsyncError(async (request, response, next) => {
    const orders = await Order.find();
    let totalAmount = 0;

    orders.forEach((order) =>{
        totalAmount += order.totalPrice;
    });

    response.status(200).json({
        success: true,
        totalAmount,
        orders
    });
});

//Update Order Status --admin
exports.updateOrder = catchAsyncError(async (request, response, next) => {
    const order = await Order.findById(request.params.id);
    
    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("You have already delivered this order", 400));
    }

    order.orderItems.forEach(async (o) =>{
        await updateStock(o.product, o.quantity);
    });

    order.orderStatus = request.body.status;

    if(request.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    response.status(200).json({
        success: true,
    });
});

//update stock of product
async function updateStock(id, quantity){
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
}

//delete order --admin
exports.deleteOrder = catchAsyncError(async (request, response, next) => {
    const order = await Order.findById(request.params.id);
    
    if(!order){
        return next(new ErrorHandler("Order not found with this id", 404));
    }

    await order.remove();

    response.status(200).json({
        success: true,
    });
});