const mongoose = require('mongoose'); 
const dotenv = require("dotenv");

dotenv.config();
 
const connectDatabase = ()=>{
    const url = "mongodb+srv://aprekshamathur456:Pankajaashi@cluster0.jqankv4.mongodb.net/pushpElectricals"
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).then((data)=>{
        console.log(`mongodb connected with server ${data.connection.host}`);
    })
}

module.exports = connectDatabase;