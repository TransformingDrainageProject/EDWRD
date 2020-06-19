const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(proxy('/api', { target: 'http://server:5000' }));
  app.use(proxy('/socket.io', { target: 'http://server:5000' }));
};
