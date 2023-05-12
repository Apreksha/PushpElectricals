const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModels");
const sendToken = require("../utils/jwtToken");
const { response } = require("express");
const { reset } = require("nodemon");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//Register a user
exports.registerUser = catchAsyncError(async(request, response, next) => {
    const {name, email, password } = request.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id: "this is a sample id",
            url: "profilepicUrl"
        },
    });

    sendToken(user, 201, response);
});

//login user
exports.loginUser = catchAsyncError(async (request, response, next) =>{
    const {email, password} = request.body;
    console.log("request" + request);
    //checking if user has given both password and email
    if(!email || !password){
        return next(new ErrorHandler("Please enter Email and Password", 400));
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    sendToken(user, 200, response);

});

//logout user
exports.logout = catchAsyncError(async (request, response, next) =>{
    response.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    response.status(200).json({
        success: true,
        message:"Logged Out"
    })
});

// forgot password
exports.forgotPassword = catchAsyncError(async (request, response, next) =>{
    const user = await User.findOne({ email: request.body.email});
    if(!user){
        return next(new ErrorHandler("User not found", 404)); 
    }

    //get resetPassword Token
    const resetToken = user.getResetPasswordToken();
    //const resetToken = user.resetPasswordToken();
    
    await user.save({validateBeforeSave: false});

    const resetPasswordUrl = `${request.protocol}://${request.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl}\n\n
    If you have not requested this email then please ignore it.`;

    try{
        await sendEmail({
            email: user.email,
            subject:`Pushp Electricals Password Recovery`,
            message,
        });
        response.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    }
    catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        
        await user.save({validateBeforeSave: false});
        return next(new ErrorHandler(error.message, 500));
    }
});

//reset password
exports.resetPassword = catchAsyncError(async (request, response, next) =>{
    //creating token hash
     const resetPasswordToken = crypto
    .createHash("sha256")
    .update(request.params.token)
    .digest("hex");
 
    const d = new Date();

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },//Date.now() + 360000000
    });

    console.log(user);
    if(!user){
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired", 400)); 
    }

    if(request.body.password !== request.body.confirmPassword){
        return next(new ErrorHandler("Password does not match", 400)); 
    }

    user.password = request.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, response);
});

//get user details
exports.getUserDetails = catchAsyncError(async (request, response, next) =>{
    const user = await User.findById(request.user.id);

    if(!user) {
        return next(new ErrorHandler(`User does not exist with id: ${request.user.id}`));
    }

    response.status(200).json({
        success: true,
        user
    });
});

//update user password
exports.updatePassword = catchAsyncError(async (request, response, next) =>{
    const user = await User.findById(request.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(request.body.oldPassword);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Old password is incorrect", 401));
    }

    if(request.body.newPassword !== request.body.confirmPassword){
        return next(new ErrorHandler("Password does not match", 401));
    }

    user.password = request.body.newPassword;
    await user.save();
    sendToken(user, 200, response);

    /* response.status(200).json({
        success: true,
        user
    }); */
});

//update user profile
exports.updateProfile = catchAsyncError(async (request, response, next) =>{
    const newuserData = {
        name: request.body.name,
        email: request.body.email
    };

    const user = await User.findByIdAndUpdate(request.user.id, newuserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })
    response.status(200).json({
        success: true,
    });
});

//get all users (admin)
exports.getAllUsers = catchAsyncError(async (request, response, next) =>{
    const users = await User.find();

    response.status(200).json({
        success: true,
        users,
    });
});

//get single users (admin)
exports.getSingleUser = catchAsyncError(async (request, response, next) =>{
    const user = await User.findById(request.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with id: ${request.params.id}`));
    }

    response.status(200).json({
        success: true,
        user,
    });
});