const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true })
.catch(err => console.log('A Mongoose Error Was Thrown: ', err));

db.once('connected', () => {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

