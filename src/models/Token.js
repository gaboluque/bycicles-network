const mongoose = require('mongoose');

const { Schema } = mongoose;

const tokenSchema = new Schema({
  _userId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 43200,
  },
});

module.exports = mongoose.model('Token', tokenSchema);
