const fs = require('fs');
const express = require('express');
const router = express.Router();
const quickstart = require('./quickstart');

router.get('/', function(req, res, next) {
  const secrets = fs.readFileSync('routes/client_secret.json', 'utf8');
  return quickstart.authorize(JSON.parse(secrets))
    .then((result) => {
      return res.json(result);
    });
});

module.exports = router;
