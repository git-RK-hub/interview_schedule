const mongoose = require('mongoose');

const DB = process.env.M_DB;
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('Connected successfully');
});
module.exports = db;
