let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser')
let reactVoltDB = require('./mongoose/database')

let indexRouter = require('./routes/index');
let customersRouter = require('./routes/customers')
let productsRouter = require('./routes/products')
let invoicesRouter = require('./routes/invoices')

let app = express();
new reactVoltDB()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use( express.static(path.join(__dirname, '../build')));

app.use('/', indexRouter);
app.use('/customers', customersRouter)
app.use('/products', productsRouter)
app.use('/invoices', invoicesRouter)

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

module.exports = app;
