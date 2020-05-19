const to = require('await-to-js').default;
const { checkSchema, validationResult } = require('express-validator');
const mongoose = require('mongoose');

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

      let err, form;
      [err, form] = await to(new Form(req.body).save());
      if (err) return next(err);

      if (form) {
        return res.sendStatus(200);
      } else {
        return res.sendStatus(500);
      }
    }
  );
};
