const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const indexRouter = require('./routes/index');
const bicyclesRouter = require('./routes/bicyclesRouter');
const bicyclesAPIRouter = require('./routes/api/bicyclesAPIRouter');
const usersRouter = require('./routes/usersRouter');
const usersAPIRouter = require('./routes/api/usersAPIRouter');
const bookingsAPIRouter = require('./routes/api/bookingsAPIRouter');
const tokensRouter = require('./routes/tokensRouter');
const passport = require('./config/passport');
const sessionsRouter = require('./routes/sessionsRouter');

const store = new session.MemoryStore();

const app = express();

app.use(
  session({
    cookie: { maxAge: 240 * 60 * 60 * 1000 },
    store,
    saveUninitialized: true,
    resave: 'true',
    secret: 'bicycleNetwork123456',
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view options', { layout: 'layout' });
app.set('view engine', 'hbs');

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', sessionsRouter);
app.use('/bicycles', bicyclesRouter);
app.use('/users', usersRouter);
app.use('/token', tokensRouter);

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
