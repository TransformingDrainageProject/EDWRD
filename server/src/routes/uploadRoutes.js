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

module.exports = (app) => {
  app.post('/api/upload', upload.array('file'), (req, res, next) => {
    // check if uploaded file is valid

    // create session variable for uploaded file
    req.session.inputFile = req.files[0].path;

    res.sendStatus(200);
  });
};
