const fs = require('fs');
const WebSocket = require('ws');
const express = require('express');
const router = express.Router();

router.get('/*', function (req, res, next) {
	const wss = require('../bin/www').wss;
	wss.clients.forEach(function each(client) {
		if (client.readyState === 1) {
			client.send("reload");
		}
	});
});

module.exports = router;
