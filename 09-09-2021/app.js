var http = require('http');


"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "testing.chiragpatel@gmail.com", // generated ethereal user
            pass: "chirag.test@11", // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'testing.chiragpatel@gmail.com', // sender address
        to: "reply.chiragpatel@gmail.com", // list of receivers
        replyTo: "cc.chirag3318@gmail.com", // reply to msg
        subject: "Nodemailer - email sending ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Welcome. Nodemailer is a module for Node.js applications to allow easy as cake email sending.</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);


http.createServer(function (req, res) {
    res.end('Welcome in the nodeJs');
}).listen(4050);

console.log('Server running on http://127.0.0.1:4050');