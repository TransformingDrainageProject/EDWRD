const { spawn } = require('child_process');
const { checkSchema, validationResult } = require('express-validator');
const createError = require('http-errors');

const { pythonPath } = require('../config');
const dailyStations = require('../utils/daily_stations.json');

const geocodeSchema = {
  lat: {
    isFloat: true,
    isEmpty: false,
    trim: true,
    escape: true,
  },
  lon: {
    isFloat: true,
    isEmpty: false,
    trim: true,
    escape: true,
  },
};

module.exports = (app) => {
  app.get('/api/site_info', checkSchema(geocodeSchema), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(
        createError(400, 'Invalid parameters', {
          errors: errors.array(),
        })
      );
    }

    const lon = req.query.lon;
    const lat = req.query.lat;

    const pythonGeocoder = spawn(pythonPath, [
      './src/utils/find_site_info.py',
      lon,
      lat,
    ]);

    pythonGeocoder.stdout.on('data', (data) => {
      // returns state abbreviation, freeze and thaw dates
      res.send({ results: JSON.parse(data.toString()) });
    });

    pythonGeocoder.on('error', (err) => {
      return next(err);
    });
  });

  app.get(
    '/api/nearest_station',
    checkSchema({
      ...geocodeSchema,
      unit: {
        isEmpty: false,
        trim: true,
        escape: true,
      },
    }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(
          createError(400, 'Invalid parameters', {
            errors: errors.array(),
          })
        );
      }

      const lon = req.query.lon;
      const lat = req.query.lat;
      const unit = req.query.unit;

      const pythonStationFinder = spawn(pythonPath, [
        './src/utils/find_nearest_station.py',
        lat,
        lon,
        unit,
      ]);

      pythonStationFinder.stdout.on('data', (data) => {
        let station;
        station = JSON.parse(data.toString().trim());
        return res.send(station);
      });

      pythonStationFinder.on('error', (err) => {
        console.log(err);
        return next(err);
      });
    }
  );

  app.get('/api/daily_stations', (req, res, next) => {
    return res.send(dailyStations);
  });
};
