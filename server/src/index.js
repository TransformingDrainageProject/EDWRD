const express = require('express');
const createError = require('http-errors');
const fs = require('fs');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const winston = require('./config/winston');

// register model schemas
require('./models/Task');

const app = express();

// log using morgan and winston
app.use(morgan('combined', { stream: winston.stream }));

// connect to database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

// priority to serve any static files
app.use(express.static(path.resolve(__dirname, '../../client/build')));

// routes
require('./routes/downloadRoutes')(app);
require('./routes/gisRoutes')(app);

// send requests not caught by a route to react client
app.get('*', (req, res, next) => {
  const reactPath = path.resolve(__dirname, '../../client/build', 'index.html');
  if (fs.existsSync(reactPath)) {
    res.sendFile(reactPath);
  } else {
    next(createError(404, 'Unable to find requested page'));
  }
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // include winston logging
  winston.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );

  res.status(err.status || 500);
  if (err.status === 400 && err.errors) {
    res.send({ errors: err.errors });
  } else {
    res.send(err.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
