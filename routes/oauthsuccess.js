const express = require('express');
const router = express.Router();

router.get('/oauthsuccess', function(req, res, next) {
  res.render('index', { title: 'SUCCESS' });
});

module.exports = router;
