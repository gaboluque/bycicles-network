const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');
const bicyclesRouter = require('./routes/bicyclesRouter');
const bicyclesAPIRouter = require('./routes/api/bicyclesAPIRouter');
const usersAPIRouter = require('./routes/api/usersAPIRouter');
const bookingsAPIRouter = require('./routes/api/bookingsAPIRouter');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view options', { layout: 'layout' });
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/bicycles', bicyclesRouter);

app.use('/api/bicycles', bicyclesAPIRouter);
app.use('/api/users', usersAPIRouter);
app.use('/api/bookings', bookingsAPIRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
