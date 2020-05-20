const { checkSchema, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { spawn } = require('child_process');

const { createTaskObject } = require('../models/taskCreator');
const { pythonPath } = require('../config');
const { getFormSchema } = require('../validation/schema');

const Form = mongoose.model('forms');

module.exports = (app) => {
  app.post(
    '/api/form',
    checkSchema(getFormSchema()),
    async (req, res, next) => {
      // validate and sanitize form values and return any errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(422).json(errors);

      const form = new Form(req.body);
      form.save((err) => {
        if (err) return next(err);
        // find wind and rhmin
        const pythonStationFinder = spawn(pythonPath, [
          './src/utils/locate_station.py',
          req.body.location.latitude,
          req.body.location.longitude,
        ]);

        let rhminWnd;
        pythonStationFinder.stdout.on('data', (data) => {
          rhminWnd = JSON.parse(data.toString());
        });

        pythonStationFinder.on('error', (err) => {
          return next(err);
        });

        pythonStationFinder.on('close', (code) => {
          const task = createTaskObject(req.body, rhminWnd);
          task.save((err) => {
            if (err) return next(err);
            return res.send(task);
          });
        });
      });
    }
  );
};
