const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration
const PORT = process.env.PORT || 3000;

// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to JSONPlaceholder API.');
});
app.use('/api/v1', createProxyMiddleware({ target: 'http://staxdeployment-env.eba-p55p2nix.us-east-2.elasticbeanstalk.com', changeOrigin: true }));
app.use('/', createProxyMiddleware({ target: 'http://staxdeployment-env.eba-p55p2nix.us-east-2.elasticbeanstalk.com/docs', changeOrigin: true }));

// Start Proxy
app.listen(PORT, () => {
    console.log(`Starting Proxy at ${PORT}`);
});