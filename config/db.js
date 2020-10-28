require('dotenv').config()
const mongoose = require('mongoose');

const URI = process.env.DB_LIVE

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;

module.exports = db