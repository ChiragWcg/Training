var express = require('express');
var router = express.Router();
var app = express();
var port = 3011

app.get('/', (req, res) => {
  res.send('Welcome in the Express JS');
});

app.get('/demo/:id/:status', (req, res) => {
  console.log("Your id is = " + req.params.id + " & Your Status is " + req.params.status);
  res.send("Your id is = " + req.params.id + "<br>Your Status is  " + req.params.status);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  // console.log('Server running on http://127.0.0.1:3000');
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Handlebars Template Engine' });
});


// Signup Form
router.get('/form', function (req, res, next) {
  res.render('form', { title: 'Signup Form' });
});

router.post('/form', function (req, res, next) {
  console.log(req.body);
  var name = req.body.txt1;
  var email = req.body.email1;
  var pass = req.body.pass1;
  var contact = req.body.con1;
  var male = req.body.male1;
  var female = req.body.female1;

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
      subject: "Nodemailer - For email sending ✔", // Subject line
      text: "Hello world?", // plain text body
      html: ` 
      <table border="3" style="background-color:cyan; font-size:x-large; border-collapse: collapse; border : 3px solid red;">
      <tr style="border : 3px solid red;">
        <th style="border : 3px solid red;">Name</th>
        <th style="border : 3px solid red;">Email</th>
        <th style="border : 3px solid red;">Password</th>
        <th style="border : 3px solid red;">Contact</th>
        <th style="border : 3px solid red;">Gender</th>
      </tr>
      <tr>
        <td style="border : 3px solid red;">${name}</td>
        <td style="border : 3px solid red;">${email}</td>
        <td style="border : 3px solid red;">${pass}</td>
        <td style="border : 3px solid red;">${contact}</td>
        <td style="border : 3px solid red;">${male}</td>
        <td style="border : 3px solid red;">${female}</td>
      </tr>
     
    </table>      
      `, // html body

      // attachments: [
      //   {
      //     filename: 'node.pdf',
      //     path: __dirname + "/node.pdf",
      //     contentType: 'application/pdf'
      //   }
      // ]
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);
});


// email send options
router.get('/emailoptions', function (req, res, next) {
  res.render('emailoptions', { title: 'Email Sending Options' });
});

router.post('/emailoptions', function (req, res, next) {
  console.log(req.body);
  var email = req.body.email1;
  var subject = req.body.txt1;
  var body = req.body.txt2;

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
      to: email, // list of receivers
      replyTo: "cc.chirag3318@gmail.com", // reply to msg
      subject: subject, // Subject line
      text: body, // plain text body
      html: ` 
      <table border="3" style="background-color:cyan; font-size:x-large; border-collapse: collapse; border : 3px solid red;">
      <tr style="border : 3px solid red;">        
        <th style="border : 3px solid red;">Email</th>
        <th style="border : 3px solid red;">Subject</th>
        <th style="border : 3px solid red;">Body</th>
      </tr>
      <tr>        
        <td style="border : 3px solid red;">${email}</td>
        <td style="border : 3px solid red;">${subject}</td>
        <td style="border : 3px solid red;">${body}</td>
      </tr>
     
    </table>
      `, // html body      
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }

  main().catch(console.error);
});

// req.query
router.get('/demo/', function (req, res, next) {
  res.send("You entered message is " + req.query.number);
  console.log("You entered message is " + req.query.number);
});

module.exports = router;
