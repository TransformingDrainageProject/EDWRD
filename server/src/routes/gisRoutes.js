const { spawn } = require('child_process');
const { checkSchema, validationResult } = require('express-validator');
const createError = require('http-errors');

const { pythonPath } = require('../config');

const geocodeSchema = {
  lat: {
    isFloat: true,
    isEmpty: false,
    trim: true,
    escape: true
  },
  lon: {
    isFloat: true,
    isEmpty: false,
    trim: true,
    escape: true
  }
};

module.exports = app => {
  app.get('/api/geocode', checkSchema(geocodeSchema), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(
        createError(400, 'Invalid parameters', {
          errors: errors.array()
        })
      );
    }

    const lon = req.query.lon;
    const lat = req.query.lat;

    const pythonGeocoder = spawn(pythonPath, [
      './utils/reverse_geocode.py',
      lon,
      lat
    ]);

    pythonGeocoder.stdout.on('data', data => {
      res.send({ results: data.toString() });
    });
  });

  app.get(
    '/api/get_freeze_and_thaw',
    checkSchema(geocodeSchema),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(
          createError(400, 'Invalid parameters', {
            errors: errors.array()
          })
        );
      }

      const lon = req.query.lon;
      const lat = req.query.lat;

      const pythonExtract = spawn(pythonPath, [
        './src/utils/get_freeze_and_thaw.py',
        lon,
        lat
      ]);

      pythonExtract.stdout.on('data', data => {
        res.send({ results: JSON.parse(data.toString()) });
      });
    }
  );
};
