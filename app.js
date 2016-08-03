var express = require('express');
var path = require('path');
const port = process.env.PORT || 3000;
// var uristring = process.env.MONGODB_URI;
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();
const Candy = require('./models/candy');
// const candiesController = new require('./controllers/candies_controller');

// app.get('/candies', candiesController.index);
// app.route('/candies')
//   .get(candiesController.index)
//   .post(candiesController.create);

const mongoose = require('mongoose');
mongoose.connect('mongodb://default:defaultpassword@ds059524.mlab.com:59524/sprazzeus-candies');

  Candy.create ({
    name: 'Chewing Gum',
    color: 'Red'
    },

    {
    name: 'Pez',
    color: 'Green'
    },

    {
    name: 'Marshmallow',
    color: 'Pink'
    },

    {
    name: 'Candy Stick',
    color: 'Blue'
    });

  // candy.save((err) => {
  //   if (err) console.log(err);
  //   else {
  //     console.log('Candy Created');
  //   }
  //   process.exit();
  // });

// let candy = Candy.findOne({ name: 'Chewing Gum' }, function (err, candy) {
//   if (err) console.log(err);
//   else {
//     console.log('Candy found...', candy);
//     if (!candy) createCandy();
//     else process.exit();
//   }
// });


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(function (req, res, next) {
  var err = new Error('Unprocessable Entity');
  err.status = 422;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
