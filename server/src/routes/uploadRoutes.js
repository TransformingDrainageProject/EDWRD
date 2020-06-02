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

const checkForMissingHeaders = (fileHeaders) => {
  // check if all column headers are present
  const requiredHeaders = [
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
  let missingHeaders = '';
  requiredHeaders.forEach((header, index) => {
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

        const missingHeaders = checkForMissingHeaders(Object.keys(data[0]));
        if (missingHeaders.length > 0) {
          return res.status(400).send({
            msg: `Uploaded file is missing the following data columns: ${missingHeaders}`,
          });
        }

        // create session variable for uploaded file contents
        req.session.inputFile = data;
        return res.sendStatus(200);
      } else {
        return res.sendStatus(200);
      }
    } catch (err) {
      return res.status(500).send({ msg: 'Uploaded file cannot be read' });
    }
  });
};
