const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

exports.isAuthenticatedUser = catchAsyncError(async (request, response, next) =>{
    const {token} = request.cookies;
    
    if(!token){
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    //const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    //json web token
    const decodedData = jwt.verify(token, "QWERTYUIOPASD");

    request.user = await User.findById(decodedData.id);
    next();
});

exports.authorizeRoles = (...roles) =>{
    return(request, response, next) =>{
        if(!roles.includes(request.user.role)){
            return next(new ErrorHandler(`Role: ${request.user.role} isn't allowed to access this resouse.`, 403));
        }
        next();
    };
};