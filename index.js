const express = require('express');
const app = express();
const port = 3000;

// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');

// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
// Deprecated: mongoose.connect('mongodb://localhost/resthub');
mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

// Added check for DB connection
if (!db) console.log('Error connecting db');
else console.log('Db connected successfully');

// Import routes
const routes = require('./routes');
// Use Api routes in the App
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
