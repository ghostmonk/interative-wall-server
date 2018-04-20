const fs = require('fs');
const express = require('express');
const router = express.Router();
const quickstart = require('./quickstart');

router.get('/', function(req, res, next) {
  fs.readFile('routes/client_secret.json', (err, content) => {
    if (err) {
      return res.send('Error loading client secret file:', err);
    }
    const result = quickstart.authorize(JSON.parse(content));
    res.send(result);
  });
});

module.exports = router;
