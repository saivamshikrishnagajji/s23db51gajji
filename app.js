// const Animal = require('./models/animal');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var animalRouter = require('./routes/animals');
var boardRouter = require('./routes/board');
var chooseRouter = require('./routes/choose');
var resourceRouter = require('./routes/resource');
var Animal = require("./models/animal");
const mongoose = require('mongoose');require('dotenv').config();

const connectionString = process.env.MONGO_CON;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/routes', chooseRouter);
app.use('/users', usersRouter);
app.use('/animals', animalRouter);
app.use('/board', boardRouter);
app.use('/animal', animalRouter);
app.use('/resource', resourceRouter);


passport.use(new LocalStrategy(
  function(username, password, done) {
  Account.findOne({ username: username })
  .then(function (user){
  if (err) { return done(err); }
  if (!user) {
  return done(null, false, { message: 'Incorrect username.' });
  }
  if (!user.validPassword(password)) {
  return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
  })
  .catch(function(err){
  return done(err)
  })
  })
  )


  app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    
// mongoose.connect(connectionString);

// // Get the default connection
// var db = mongoose.connection;

// // Bind connection to error event
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// db.once("open", function(){
//   console.log("Connection to DB succeeded");
// });

mongoose.connect('mongodb+srv://saivamshikrishnag1882:saivamshikrishnag1882@cluster0.w88l4ta.mongodb.net/?retryWrites=true&w=majority').
then(() => {
    console.log("DB connected");

    async function recreateDB() {
      // Delete everything
      await Animal.deleteMany();
      //one instance
      let instance1 = new Animal({ animal_type: "Lion", color: 'Brown', legs: 4});
      let instance2 = new Animal({ animal_type: "Tiger", color: 'Gray', legs: 4});
      let instance3 = new Animal({ animal_type: "Deer", color: 'Green', legs: 4});
      instance1.save().then(doc => {
        console.log("First object saved")
      }
      ).catch(err => {
        console.error(err)
      });
      instance2.save().then(doc => {
        console.log("Second object saved")
      }
      ).catch(err => {
        console.error(err)
      });
      instance3.save().then(doc => {
        console.log("Third object saved")
      }
      ).catch(err => {
        console.error(err)
      });
  
    }
  
    let reseed = true;
    if (reseed) { recreateDB(); }
  
  
})
.catch((err) => console.log(err.message))


var Account =require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
