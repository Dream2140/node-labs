const express = require('express');

const app = express();

const directorRoutes= require("./director.routes");

const genreRoutes= require("./genre.routes");

const movieRoutes= require("./movie.routes");

app.use('/directors', directorRoutes);
app.use('/genres', genreRoutes);
app.use('/movies', movieRoutes);

module.exports = app;