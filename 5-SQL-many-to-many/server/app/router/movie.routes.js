const movieController = require("../controllers/movie.controller.js");

const createMovieValidator = require('../validators/movie/createMovieValidator');
const updateMovieValidator = require('../validators/movie/updateMovieValidator');
const getMovieValidator = require('../validators/movie/getMovieValidator');
const deleteMovieValidator = require('../validators/movie/deleteMovieValidator');
const deleteMovieGenreValidator = require('../validators/movie/deleteMovieGenreValidator');

const router = require("express").Router();

router.post("/", createMovieValidator, movieController.createMovie);

router.get("/", movieController.findAllMovies);

router.get("/:id", getMovieValidator, movieController.findOneByMovieId);

router.put("/:id", updateMovieValidator, movieController.updateMovie);

router.put("/remove-genre/:id", deleteMovieGenreValidator, movieController.removeGenresFromMovie);

router.delete("/:id", deleteMovieValidator, movieController.deleteMovie);

router.delete("/", movieController.deleteAllMovies);

module.exports = router;