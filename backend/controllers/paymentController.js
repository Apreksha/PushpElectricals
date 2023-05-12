//const { instance } = require("../server.js");
const crypto = require("crypto");

const Razorpay = require("razorpay"); 
const { Payment } = require("../models/paymentModel");
const catchAsyncError = require("../middleware/catchAsyncError");

const instance = new Razorpay({
    key_id: 'rzp_test_wwoaQzbbCBJDOV',
    key_secret: 'GT5R7iRwuRaEhKC1BFIzC1Gi'
});

exports.checkout = async (request, response) => {
    const options = {
        amount: Number(request.body.amount * 100),
        //amount:50000,
        currency: "INR",
    };
    const order = await instance.orders.create(options);
    console.log(order);
    response.status(200).json({
       success: true,
       order 
    });
}

exports.paymentVerification = catchAsyncError(async (request, response) => {
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = request.body;

    let body=razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac('sha256', 'GT5R7iRwuRaEhKC1BFIzC1Gi')
                                    .update(body.toString())
                                    .digest('hex');
                                    console.log("sig received ", razorpay_signature);
                                    console.log("sig generated ", expectedSignature);
    
    const isAuthentic = expectedSignature === razorpay_signature;

    if(isAuthentic){
        //Database comes here
        //await Payment.create(request.body);
        /*create({
            razorpay_order_id, 
            razorpay_payment_id, 
            razorpay_signature
        });*/
        response.redirect(`http://localhost:3000/`);
    }
    else{
        response.status(400).json({
            success: false,
        });
    }
    
});