var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const connectionString =process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var eagleRouter = require('./routes/eagle');
var gridbuildRouter = require('./routes/board');
var chooseRouter = require('./routes/choose');
var eagle = require('./models/eagle');
var resourceRouter = require('./routes/resource');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
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
  
  



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/eagle', eagleRouter);
app.use('/board', gridbuildRouter);
app.use('/choose', chooseRouter);
app.use('/resource', resourceRouter);





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

// passport config
// Use the existing connection
// The Account model
var Account =require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connectionerror:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});
async function recreateDB(){
  // Delete everything
  await eagle.deleteMany();
  let instance1 = new
  eagle({eagle_color:"brown",eagle_breed:"Bald gaint eagle",eagle_price:2000});
  instance1.save().then(doc=>{
    console.log("first object saved")}
    ).catch(err=>{
    console.error(err)
    });
 
  let instance2 = new
  eagle({eagle_color:"white",eagle_breed:"Harpy eagle",eagle_price:5500});
  instance2.save().then(doc=>{
    console.log("second object saved")}
    ).catch(err=>{
    console.error(err)
    });
 
  let instance3 = new
eagle({eagle_color:"black",eagle_breed:"Havana",eagle_price:4000});
instance3.save().then(doc=>{
  console.log("third object saved")}
  ).catch(err=>{
  console.error(err)
  });
 }

 let reseed = true;
 if (reseed) { recreateDB();}

module.exports = app;

