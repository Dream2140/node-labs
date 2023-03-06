const genreController = require("../controllers/genre.controller.js");

const createGenreValidator = require('../validators/genre/createGenreValidator');
const updateGenreValidator = require('../validators/genre/updateGenreValidator');
const getGenreValidator = require('../validators/genre/getGenreValidator');
const deleteGenreValidator = require('../validators/genre/deleteGenreValidator');

const router = require("express").Router();

router.post("/", createGenreValidator, genreController.createGenre);

router.get("/", genreController.findAllGenres);

router.get("/:id", getGenreValidator, genreController.findOneByGenreId);

router.put("/:id", updateGenreValidator, genreController.updateGenreTitle);

router.delete("/:id", deleteGenreValidator, genreController.deleteGenre);

router.delete("/", genreController.deleteAllGenres);

module.exports = router;