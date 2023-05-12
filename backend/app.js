const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

app.use(express.json());
app.use(cookieParser());

//Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoute");
const paymentRoute = require("./routes/paymentRoute");
const upload = require('./routes/uploadRoute');

app.use("/file", upload);
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

let gfs;
const conn = mongoose.connection;
conn.once("open", function(){
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
});

//Middleware for Errors
app.use(errorMiddleware);
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use("/api/v1", paymentRoute);

//media routes
app.get('/file/:filename', async (request, response) => {
    try{
        const file = await gfs.files.findOne({filename: request.params.filename});
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(response);
    }
    catch(error){
        response.send("Not Found");
    }
});

app.delete("/file/:filename", async(request, response) => {
    try{
        await gfs.files.deleteOne({filename: request.params.filename});
        response.send("success");
    }
    catch(error){
        console.log(error);
        response.send("An error occurred");
    }
})

app.get("/api/v1/getkey", (request, response) => response.status(200).json({key: "rzp_test_wwoaQzbbCBJDOV"}))
module.exports = app;