const path = require('path');

module.exports = app => {
  app.get('/api/example', (req, res, next) => {
    res.download(
      path.resolve(__dirname, '../templates', 'example_input_file.txt')
    );
  });
};
