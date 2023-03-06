const directorController = require("../controllers/director.controller.js");

const router = require("express").Router();

const createDirectorValidator = require('../validators/director/createDirectorValidator');
const getDirectorValidator = require('../validators/director/getDirectorValidator');
const updateDirectorValidator = require('../validators/director/updateDirectorValidator');
const deleteDirectorValidator = require('../validators/director/deleteDirectorValidator');

router.post("/", createDirectorValidator, directorController.createDirector);

router.get("/", directorController.findAllDirectors);

router.get("/:id", getDirectorValidator, directorController.findOneByDirectortId);

router.put("/:id", updateDirectorValidator, directorController.updateDirector);

router.delete("/:id", deleteDirectorValidator, directorController.deleteDirector);

router.delete("/", directorController.deleteAlldirectors);

module.exports = router;