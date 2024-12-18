const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://smartback:5000',
      changeOrigin: true,
    })
  );
};

    // "http-proxy-middleware": "^2.0.6"