const mongoose = require('mongoose');

exports.dbConnect = async () => {
  await mongoose.connect(
    'mongodb://127.0.0.1:27017/test',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    },
    async (err) => {
      if (err) {
        throw new Error(err);
      }
    }
  );
};

exports.dbClose = async () => {
  await mongoose.connection.close();
};
