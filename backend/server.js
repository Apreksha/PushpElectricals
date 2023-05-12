const express = require('express');
const app = require('./app');
const Razorpay = require("razorpay");  
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passportSetup = require("./passport");
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoute = require("./routes/auth");
app.use(express.json());
app.use(cookieParser());

//Handling UnCaught Exception
process.on("uncaughtException", (error)=>{
    console.log(`Error: ${error.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

//config
dotenv.config({path: "backend/config/config.env"});

app.use(cookieSession({name: "session", keys: ["pushpelectricals"], maxAge: 24*60*60*100}));

// register regenerate & save after the cookieSession middleware initialization
app.use(function(request, response, next) {
    if (request.session && !request.session.regenerate) {
        request.session.regenerate = (cb) => {
            cb()
        }
    }
    if (request.session && !request.session.save) {
        request.session.save = (cb) => {
            cb()
        }
    }
    next()
});

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: "http://localhost:8000",
    methods: "GET,POST,PUT,DELETE", 
    credentials: true,
}));

app.use("/auth", authRoute);

//connecting to database
connectDatabase();

const server = app.listen(8000, ()=>{
    console.log(`server is running on http://localhost:8000`);
})
server.keepAliveTimeout = 81 * 1000;

//Unhandled Promise Rejection
process.on("unhandledRejection", (error) =>{
    console.log(`Error: ${error.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() =>{
        process.exit(1);
    });
});