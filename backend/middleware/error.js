const { request, response } = require('../app');
const ErrorHandler = require('../utils/errorHandler');

module.exports = (error, request, response, next) => {
    error.statusCode = error.statusCode || 500;
    error.message = error.message || "Internal Server Error";

    //Wrong MongoDB ID Error
    if(error.name === "CastError"){
        const message = `Resource not found. Invalid : ${error.path}`;
        error = new ErrorHandler(message, 400);
    }

    //mongoose duplicate key error
    if(error.code === 11000){
        const message = `Duplicate ${Object.keys(error.keyValue)} Entered`;
        error = new ErrorHandler(message, 400);
    }

    //Wrong JWT Error
    if(error.name === "JsonWebTokenError"){
        const message = `JSON Web Token is invalid. Try again`;
        error = new ErrorHandler(message, 400);
    }

    //JWT Expire Error
    if(error.name === "TokenExpiredError"){
        const message = `JSON Web Token has been expired. Try again`;
        error = new ErrorHandler(message, 400);
    }

    response.status(error.statusCode).json({
        success: false, 
        message: error.message
    })
}