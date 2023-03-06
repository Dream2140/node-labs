const express = require('express');
const app = express();
const ManagerRoutes= require('./routes/manager.routes');
const DocumentRoutes= require('./routes/document.routes');

app.use('/managers', ManagerRoutes);
app.use('/documents', DocumentRoutes);

module.exports = app;