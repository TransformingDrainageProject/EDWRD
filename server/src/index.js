const express = require('express');
const createError = require('http-errors');
const fs = require('fs');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const uniqid = require('uniqid');

const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server);

const { mongoURI, sessionSecret } = require('./config');
const winston = require('./config/winston');

// register model schemas
require('./models/Form');
require('./models/Task');

app.use(express.json());

// listen for connections
let socketID = null;
io.on('connection', (socket) => {
  socketID = socket.id;
  winston.info('a client connected');
  socket.on('disconnect', () => {
    socketID = null;
    winston.info('a client disconnected');
  });
});

// log using morgan and winston
app.use(morgan('combined', { stream: winston.stream }));

// connect to database
const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI);
  } catch (err) {
    winston.error(err);
    setTimeout(() => {
      connectToDatabase();
    }, 2000);
  }
};

connectToDatabase();

// set up session using existing mongoose connection
app.use(
  session({
    cookie: { secure: process.env.NODE_ENV === 'production' ? true : false },
    resave: false,
    saveUninitialized: false,
    secret: sessionSecret,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use((req, res, next) => {
  if (socketID) {
    req.session.client = { socketID: socketID };
  }
  next();
});

// priority to serve any static files
app.use(express.static(path.resolve(__dirname, '../../client/build')));

// routes
require('./routes/downloadRoutes')(app);
require('./routes/formRoutes')(app, io);
require('./routes/gisRoutes')(app);
require('./routes/uploadRoutes')(app);

// generate unique id for the client
app.get('/api/get_clientid', (req, res) => {
  if (!req.session.clientID) {
    req.session.clientID = uniqid();
  }
  res.send(req.session.clientID);
});

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
server.listen(PORT);
