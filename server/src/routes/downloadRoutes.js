const { checkSchema, validationResult } = require('express-validator');
const createError = require('http-errors');
const fs = require('fs');
const path = require('path');

const dailyStations = require('../utils/daily_stations.json');

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

const stationInputSchema = {
  stationID: {
    isEmpty: false,
    trim: true,
    escape: true,
  },
  unit: {
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
    '/api/download_station_input',
    checkSchema(stationInputSchema),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(
          createError(400, 'Invalid parameters', {
            errors: errors.array(),
          })
        );
      }

      // use station ID to find station in dailyStations object
      const stationID = req.query.stationID;
      const unit = req.query.unit;
      const station = dailyStations.stations.filter((station) => {
        return station.id === parseInt(stationID);
      });

      // return input file that matches station ID and requested unit
      if (station && station.length === 1) {
        let stationFile = '';
        if (unit === 'us') {
          stationFile = station[0].file.input.split('.txt')[0] + '_us.txt';
        } else {
          stationFile = station[0].file.input;
        }
        res.download(
          path.resolve(__dirname, '../utils', 'daily_stations', stationFile)
        );
      } else {
        res.send({ msg: 'Could not find requested file' });
      }
    }
  );

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
