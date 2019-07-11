const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true })
.catch(err => console.log('A Mongoose Error Was Thrown: ', err));

// make sure that when you create the cluster on mongodbAtlas, that when you WHITELIST ip addresses,
// that the db is accessible from anywhere; you can change this setting in the mongodbAtlas website,
// look at the left side under the SECURITY tab and go into the Network Access, look into Actions, Edit,
// and you'll see the option; also be very careful when you set up the heroku config; don't double paste
// so you end up with something like: DATABASE_URL=DATABASE_URL=mongo....

db.once('connected', () => {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

