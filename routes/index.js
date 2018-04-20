const fs = require('fs');
const express = require('express');
const router = express.Router();
const quickstart = require('./quickstart');

router.get('/', function(req, res, next) {
  fs.readFile('routes/client_secret.json', (err, content) => {
    if (err)
      return console.log('Error loading client secret file:', err);
    quickstart.authorize(JSON.parse(content), quickstart.listEvents);
  });
});

module.exports = router;
