const mongoose = require('mongoose');
const logger = require('morgan');
const app = require('./app');

if (process.env.NODE_ENV !== 'production') {
  mongoose.set('debug', true);
}

mongoose
  .connect('mongodb://localhost/bicycle-network', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
    process.exit(1);
  });

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

app.use(logger('dev'));
app.listen(process.env.PORT, '0.0.0.0');
