const csv = require('csvtojson');
const createError = require('http-errors');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const tmp = require('tmp');

const INPUT_HEADERS = [
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

const PARAM_HEADERS = [
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

// file upload storage options
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (!req.session.workspace || !fs.existsSync(req.session.workspace)) {
        tmp.dir(function _tempDirCreated(err, path, cleanupCallback) {
          if (err) throw err;
          req.session.workspace = path;
          cb(null, path);
        });
      } else {
        cb(null, req.session.workspace);
      }
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

const formatInputData = (data) => {
  const columnHeaders = Object.keys(data[0]);
  let formattedData = {};

  columnHeaders.forEach((header) => (formattedData[header] = []));

  data.forEach((row) => {
    columnHeaders.forEach((header) => formattedData[header].push(row[header]));
  });

  return formattedData;
};

const formatParamData = (data) => {
  const columnHeaders = Object.keys(data[0]);
  let formattedData = {};

  const arrayHeaders = ['wind', 'rhmin', 'cstage', 'ngrw_stage', 'cht', 'kc'];
  columnHeaders.forEach((header) => {
    if (arrayHeaders.indexOf(header) > -1) {
      formattedData[header] = [];
    } else {
      formattedData[header] = undefined;
    }
  });

  data.forEach((row, index) => {
    columnHeaders.forEach((header) => {
      if ((header === 'wind' || header === 'rhmin') && index < 12) {
        formattedData[header].push(row[header]);
      } else if ((header === 'cstage' || header === 'kc') && index < 4) {
        formattedData[header].push(row[header]);
      } else if ((header === 'ngrw_stage' || header === 'cht') && index < 3) {
        formattedData[header].push(row[header]);
      } else if (index < 1) {
        formattedData[header] = row[header];
      }
    });
  });

  return formattedData;
};

const checkForMissingHeaders = (fileHeaders, type) => {
  // check if all column headers are present
  const requiredHeaders = type === 'input' ? INPUT_HEADERS : PARAM_HEADERS;
  let missingHeaders = '';
  requiredHeaders.forEach((header) => {
    if (fileHeaders.indexOf(header) < 0) {
      missingHeaders += missingHeaders ? `, ${header}` : header;
    }
  });

  return missingHeaders;
};

const cleanupTempWorkspace = async (tempFile) => {
  // remove uploaded file
  fs.unlink(tempFile, (err) => {
    if (err) {
      winston.error(`Unable to remove uploaded file - ${tempFile}`);
    }
    // remove temporary directory
    fs.rmdir(path.dirname(tempFile), (err) => {
      if (err) {
        winston.error(
          `Unable to remove temporary workspace - ${path.dirname(tempFile)}`
        );
      }
    });
  });
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
          cleanupTempWorkspace(req.files[0].path);
          return next(createError(400, 'Uploaded file is empty'));
        }

        const missingHeaders = checkForMissingHeaders(
          Object.keys(data[0]),
          req.body.type
        );
        if (missingHeaders.length > 0) {
          cleanupTempWorkspace(req.files[0].path);
          return next(
            createError(
              400,
              `Uploaded file is missing the following data columns: ${missingHeaders}`
            )
          );
        }

        // create session variable for uploaded file contents
        if (req.body.type === 'input') {
          req.session.inputFile = req.files[0].filename;
        } else if (req.body.type === 'param') {
          req.session.paramFile = req.files[0].filename;
        } else {
          cleanupTempWorkspace(req.files[0].path);
          return next(
            createError(400, "Uploaded file's type cannot be determined")
          );
        }

        return res.sendStatus(200);
      } else {
        cleanupTempWorkspace(req.files[0].path);
        return next(createError(500, 'Uploaded file cannot be read'));
      }
    } catch (err) {
      cleanupTempWorkspace(req.files[0].path);
      return next(createError(500, 'Uploaded file cannot be read'));
    }
  });
};
