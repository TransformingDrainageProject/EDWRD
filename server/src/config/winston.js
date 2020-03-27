const path = require('path');
const winston = require('winston');

// define the custom settings for each transport
const options = {
  file: {
    level: 'info',
    filename: path.resolve(__dirname, '../logs/server.log'),
    handleExceptions: true,
    format: winston.format.json(),
    maxSize: 5242880, // 5MB
    maxFiles: 5
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.align(),
      winston.format.printf(debug => {
        const { timestamp, level, message, ...args } = debug;

        const ts = timestamp.slice(0, 19).replace('T', ' ');
        return `${ts} [${level}]: ${message} ${
          Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
        }`;
      })
    )
  }
};

// instantiate a new winston logger with the above settings
const logger = winston.createLogger({
  transports: [new winston.transports.File(options.file)],
  exitOnError: false // do not exit on handled exceptions
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console(options.console));
}

// create a stream object with a 'write' function that will be used by 'morgan'
logger.stream = {
  // use the 'info' log level so the output will be picked up by both transports
  write: (message, encoding) => logger.info(message)
};

module.exports = logger;
