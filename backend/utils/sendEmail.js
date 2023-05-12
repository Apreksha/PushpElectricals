const nodeMailer = require("nodemailer");

const sendEmail = async (options) =>{
    const transporter = nodeMailer.createTransport({
        //host: process.env.SMPT_HOST,
        host: "smtp.gmail.com",
        port: 465,//process.env.SMPT_PORT,
        service: "gmail",// process.env.SMPT_SERVICE,
        auth: {
            user: "jhilmilmehta789@gmail.com",//process.env.SMPT_MAIL,
            pass: "rznxzvtutfrhdpnv",//process.env.SMPT_PASSWORD,
        }
    });

    const mailOptions={
        from: "jhilmilmehta789@gmail.com",//process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    await transporter.sendMail(mailOptions); 
};

module.exports = sendEmail;