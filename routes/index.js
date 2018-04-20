const fs = require('fs');
const WebSocket = require('ws');
const express = require('express');
const router = express.Router();
const quickstart = require('./quickstart');

router.get('/*', function(req, res, next) {
  const wss = require('../bin/www').wss;
  const secrets = fs.readFileSync('test/client_secret.json', 'utf8');
  return quickstart.authorize(JSON.parse(secrets))
    .then((result) => {
      wss.clients.forEach(function each(client) {
        if (client.readyState === 1) {
          client.send(JSON.stringify(result));
        }
      });
      return res.send("success");
    });
});

module.exports = router;
