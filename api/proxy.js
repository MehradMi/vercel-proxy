const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({
  target: 'http://216.144.228.182:10000',
  ws: true,
  changeOrigin: true
});

module.exports = (req, res) => {
  proxy.web(req, res, (err) => {
    if (err) {
      res.statusCode = 502;
      res.end('Proxy error: ' + err.message);
    }
  });
};

module.exports.config = {
  api: {
    bodyParser: false
  }
};
