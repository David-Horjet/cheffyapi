const express = require('express');
const nodemailer = require('nodemailer');
const bodyparser = require('body-parser');
const flash = require('connect-flash');
const cors = require("cors");
const ejs = require('ejs');
const dotenv = require('dotenv').config();
const path = require('path');


const app = express();

// Environment Variables
PORT = process.env.PORT || 8000;
EMAIL = process.env.EMAIL;
PASSWORD = process.env.PASSWORD

// Setting up the view engine
app.set('view engine', 'ejs');

// Setting up the middlewares
app.use(express.static('./public'));
app.use(bodyparser.urlencoded({
  extended: false
}));
app.use(cors());
app.use(bodyparser.json());
app.use(flash());
// app.use((req, res, next) => {
//      res.locals.successMessage = req.flash('success');
//      res.locals.errorMessage = req.flash('error');
//      next();
// });

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/', async (req, res) => {
  const emailToSend = `
     <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: 0;
      list-style: none;
      font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
        "Lucida Sans", Arial, sans-serif;
    }

    hr {
      margin: 10px 0;
    }

    body {
      background-color: rgb(240, 240, 240);
    }

    .wrapper {
      margin: 50px;
      padding: 30px 50px;
      background-color: rgb(22, 21, 41);
      color: #ffffff;
    }

    .wrapper h2 {
      color: #00ff00;
    }

    .wrapper h1 span {
      color: #00ff00;
    }

    @media (max-width: 560px) {
      .wrapper {
        margin: 20px;
        padding: 20px;
      }

      .wrapper h1 {
        font-size: 30px;
      }

      .wrapper h2 {
        font-size: 20px;
      }
    }
  </style>
  <body>
    <div class="wrapper">
      <div class="image">
        <img src="" alt="" />
      </div>
      <div class="content">
        <h1>Hi <span>Co-</span>creatives,</h1>
        <hr />
        <p>You have a new contact request from your website</p>
        <br />
        <h2>Contact Details</h2>
        <br />
        <ul>
          <li><strong>Name</strong>: ${req.body.name}</li>
          <br />
          <li><strong>Email</strong>: ${req.body.email}</li>
          <br />
          <li><strong>Subject</strong>: ${req.body.subject}</li>
          <br />
        </ul>
        <h2>Contact Message</h2>
        <br />
        <p>${req.body.message}</p>
      </div>
    </div>
  </body>
</html>

     `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL, // generated ethereal user
      pass: PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let mailOptions = {
    from: req.body.email, // sender address
    to: EMAIL, // list of receivers
    subject: req.body.subject, // Subject line
    text: "Co-creatives has sent you a contact message", // plain text body
    html: emailToSend, // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(400).json({
        status: false,
        message: "message error"
      })
    } else {
      return res.status(200).json({
        status: true,
        message: "message sent"
      })
    }
  })

});


app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});