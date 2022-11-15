const express = require('express');
const nodemailer = require('nodemailer');
const bodyparser = require('body-parser');
const flash = require('connect-flash');
const ejs = require('ejs');
const dotenv = require('dotenv').config();


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
     const output = `
     <p>You have a new contact request</p>
     <h3>Contact Details</h3>
     <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Subject: ${req.body.subject}</li>``````````
     </ul>
     <h3>Message</h3>
     <p>${req.body.message}</p> 
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
          from: 'davidojetola956@gmail.com', // sender address
          to: "davidhorjet@gmail.com", // list of receivers
          subject: "Hello ✔ From Cheffy Contact Request", // Subject line
          text: "Cheffy has sent you a contact message", // plain text body
          html: output, // html body
     };

     transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
               return console.log(error);
          } else {
               console.log("Message sent: %s", info.messageId);
          }
     })

});


app.listen(PORT, () => {
     console.log(`Server is listening at port ${PORT}`);
});