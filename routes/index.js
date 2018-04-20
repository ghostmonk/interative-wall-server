const fs = require('fs');
const express = require('express');
const router = express.Router();
const quickstart = require('./quickstart');
const wss = require('../bin/www').wss;

router.get('/*', function(req, res, next) {
  const secrets = fs.readFileSync('routes/client_secret.json', 'utf8');
  return quickstart.authorize(JSON.parse(secrets))
    .then((result) => {
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(result);
        }
      });
      return res.send("success");
    });
});

module.exports = router;
