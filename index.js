const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, './client/build')));

require('./routes/gisRoutes')(app);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
