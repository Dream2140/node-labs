const express = require('express');

const viewRouter = require('./view.router');
const authRouter = require('./auth.router');

const router = express();

router.use('/', viewRouter);
router.use('/auth', authRouter);

module.exports = router;
