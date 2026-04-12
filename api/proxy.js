const { createServer } = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({
  target: 'http://216.144.228.182:10000',
  ws: true,
  changeOrigin: true
});

module.exports = (req, res) => {
  res.status(200).send('OK');
};

module.exports = (req, res) => {
  proxy.web(req, res);
};

module.exports.config = {
  api: {
    bodyParser: false
  }
};
