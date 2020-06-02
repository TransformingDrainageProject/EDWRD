const csv = require('csvtojson');
const multer = require('multer');
const tmp = require('tmp');

// file upload storage options
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      tmp.dir(function _tempDirCreated(err, path, cleanupCallback) {
        if (err) throw err;
        cb(null, path);
      });
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

const inputHeaders = [
  'year',
  'month',
  'day',
  'prcp',
  'dflw',
  'max_upflx',
  'water_evap',
  'eto',
  'no3c',
  'srpc',
];

const paramHeaders = [
  'darea',
  'iarea',
  'rarea',
  'rdep',
  'rdep_min',
  'rseep',
  'zr',
  'zrfc',
  'zrwp',
  'ze',
  'zefc',
  'zewp',
  'rew',
  'cn',
  'wind',
  'rhmin',
  'cstart',
  'cstage',
  'ngrw_stage',
  'cht',
  'kc',
  'fw',
  'pfact',
  'irrdep',
  'irrdep_min',
  'resd',
  'dareaIncSurfaceRunoff',
];

const checkForMissingHeaders = (fileHeaders, type) => {
  // check if all column headers are present
  const requiredHeaders = type === 'input' ? inputHeaders : paramHeaders;
  let missingHeaders = '';
  requiredHeaders.forEach((header) => {
    if (fileHeaders.indexOf(header) < 0) {
      missingHeaders += missingHeaders ? `, ${header}` : header;
    }
  });

  return missingHeaders;
};

module.exports = (app) => {
  app.post('/api/upload', upload.array('file'), async (req, res, next) => {
    // check if uploaded file is valid
    try {
      const data = await csv({ delimiter: ['\t', ','] }).fromFile(
        req.files[0].path
      );
      if (data) {
        if (data.length < 1) {
          // no file content detected
          return res.status(400).send({
            msg: 'Uploaded file is empty',
          });
        }

        const missingHeaders = checkForMissingHeaders(
          Object.keys(data[0]),
          req.body.type
        );
        if (missingHeaders.length > 0) {
          return res.status(400).send({
            msg: `Uploaded file is missing the following data columns: ${missingHeaders}`,
          });
        }

        // create session variable for uploaded file contents
        if (req.body.type === 'input') {
          req.session.inputFile = data;
        } else if (req.body.type === 'param') {
          req.session.paramFile = data;
        } else {
          return res
            .status(400)
            .send({ msg: "Uploaded file's type cannot be determined" });
        }

        return res.sendStatus(200);
      } else {
        return res.sendStatus(200);
      }
    } catch (err) {
      return res.status(500).send({ msg: 'Uploaded file cannot be read' });
    }
  });
};
