const express = require('express');
const path = require('path');
const app = express();

// Built in middleware
app.use(express.json());
app.use(path, express.static(path.join(__dirname, '../public')));

// App routes
app.use((req, res, next) => {
  next();
});
app.use('/lovedones', require('./controllers/lovedones'));
app.use('/officeplants', require('./controllers/officeplants'));
app.use('/balconyplants', require('./controllers/balconyplants'));
app.use('/candles', require('./controllers/candles'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
