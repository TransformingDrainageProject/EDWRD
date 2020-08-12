const { checkSchema, validationResult } = require('express-validator');
const createError = require('http-errors');
const fs = require('fs');
const path = require('path');

const sessionIDSchema = {
  sessionID: {
    isEmpty: false,
    trim: true,
    escape: true,
  },
  type: {
    isEmpty: false,
    trim: true,
    escape: true,
  },
};

module.exports = (app) => {
  app.get('/api/example', (req, res, next) => {
    res.download(
      path.resolve(__dirname, '../templates', 'example_input_file.txt')
    );
  });

  app.get(
    '/api/download_results',
    checkSchema(sessionIDSchema),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(
          createError(400, 'Invalid parameters', {
            errors: errors.array(),
          })
        );
      }
      const sessionID = req.query.sessionID;
      const type = req.query.type;

      const downloadFile =
        type === 'annual'
          ? 'annual_output.xlsx'
          : type === 'monthly'
          ? 'monthly_output.xlsx'
          : 'daily_output.xlsx';

      if (fs.existsSync(path.resolve('/', 'tmp', sessionID, downloadFile))) {
        res.download(path.resolve('/', 'tmp', sessionID, downloadFile));
      } else {
        next(createError(400, `Unable to find ${downloadFile}`));
      }
    }
  );
};
