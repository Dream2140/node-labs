const express = require('express');

const router = express();

const taskRouter = require('./task.router');

const wikiRouter = require('./wiki.router');

router.use('/tasks', taskRouter);
router.use('/wiki', wikiRouter);


module.exports = router;
