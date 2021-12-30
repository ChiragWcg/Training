let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');
let session = require('express-session');
let flash = require('connect-flash');
let passport = require("passport");
let fileupload = require('express-fileupload');
let bodyParser = require('body-parser');

// require('custom-env').env('development')

require('./global/globalFunctions');
global.config = require('./config/config.json');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let userModel = require('./model/userModel');

let app = express();
let port = process.env.PORT

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.use(fileupload());

async function isAdmin(value) {
  try {
    var user = await userModel.findOne({ email: "admin@admin.com" });
    // console.log("user...", user);

    if (user) {
      console.log("user is already exists....");
    } 
    else {
      const mydata = {
        name: "Admin",
        email: "admin@admin.com",
        contact: "1234567890",
        password: "123456",
      };
      var user = userModel(mydata);
      user.save();
      // console.log("user is inserted");
    }
  } 
  catch (error) {
    console.log(error);
  }
}

// db connection =======
mongoose
  .connect("mongodb://chirag:chirag@localhost:27017/chirag")
  .then(() => console.log("Connection Successfully"))
  .then(isAdmin)
  .catch((error) => console.log(error))

  
// session
// app.use(session({
//   secret: 'geeksforgeeks',
//   saveUninitialized: true,
//   resave: true
// }));

// app.use(flash());


// Passport
// app.use(passport.initialize());
// app.use(passport.session());

// require("./passport");


app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// console.log(process.env.APP_ENV)
// console.log(process.env.DB_HOST)
// console.log(process.env.DB_USER)
// console.log(process.env.DB_PASS)
// console.log(process.env.PORT)

module.exports = app;
