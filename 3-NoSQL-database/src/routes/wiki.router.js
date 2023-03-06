const express = require('express');

const router = express();

const wikiController = require('../controllers/wiki.controller');

router.get('/:topicName', wikiController.getTopic);

module.exports = router;
