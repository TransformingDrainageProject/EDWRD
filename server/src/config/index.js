const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  pythonPath: process.env.PYTHON_PATH,
  sessionSecret: process.env.SESSION_SECRET,
};
