const { spawn } = require('child_process');
const { checkSchema, validationResult } = require('express-validator');

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
  app.get('/api/geocode', checkSchema(geocodeSchema), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const lat = req.query.lat;
    const lon = req.query.lon;

    const pythonGeocoder = spawn(pythonPath, [
      './utils/reverse_geocode.py',
      lat,
      lon
    ]);

    pythonGeocoder.stdout.on('data', data => {
      res.send({ state: data.toString() });
    });
  });

  app.get(
    '/api/extract_point_value',
    checkSchema(geocodeSchema),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const lat = req.query.lat;
      const lon = req.query.lon;

      const pythonExtract = spawn(pythonPath, [
        './utils/extract_point_value.py',
        lat,
        lon
      ]);

      pythonExtract.stdout.on('data', data => {
        res.send({ values: data.toString() });
      });
    }
  );
};
