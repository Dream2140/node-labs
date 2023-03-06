const express = require('express');

const app = express();

const taskRoutes = require('./routes/task.routes');

app.use('/tasks', taskRoutes);

module.exports = app;
