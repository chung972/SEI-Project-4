const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const Chatkit = require("@pusher/chatkit-server");

const app = express();

const chatkit = new Chatkit.default({
  instanceLocator: "v1:us1:b93e8a79-4f9a-41f3-b407-1757f163d0c3",
  key: "0b7aa237-a82a-438c-ad8b-3980c2eab270:wN+3wbyIzdEokkobixJm0UnGusKSVuehDV1uswGu8Vo="
})

require('dotenv').config();
require('./config/database');

app.use(logger('dev'));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
app.use("/api/chatboards", require("./routes/api/chatboards"));

// The following "catch all" route (note the *)is necessary
// for a SPA's client-side routing to properly work 
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express server running on port ${port}`)
});