const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({
  target: 'http://216.144.228.182.nip.io:10000',
  changeOrigin: true,
  timeout: 8000,
});

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  proxy.web(req, res, (err) => {
    res.statusCode = 502;
    res.end(JSON.stringify({ error: err.message }));
  });
};

module.exports.config = {
  api: {
    bodyParser: false,
  },
};
