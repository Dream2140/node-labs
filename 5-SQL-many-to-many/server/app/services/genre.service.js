const validator = require('validator');

const db = require("../database/db");

const Genre = db.genre;

const Database = require('../database/dbApi');

const ErrorHandler = require('../helpers/errorHandler');

const genreErrorHandler = new ErrorHandler('Genre')
const dbGenre = new Database(Genre, genreErrorHandler);

module.exports = class GenreService {

    createGenre = async (genreData) => {

        return await dbGenre.create(genreData);

    }

    findAllGenres = async (req) => {

        return await dbGenre.findAll();

    }

    findOneByGenreId = async (genreId) => {

        return await dbGenre.findOne(genreId);

    }

    updateGenreTitle = async (genreId, newGenreData) => {

        return await dbGenre.update(genreId, newGenreData);

    }

    deleteGenre = async (genreId) => {

        return await dbGenre.delete(genreId);

    }

    deleteAllGenres = async () => {

        return await dbGenre.deleteAll();

    }

    checkGenreExistence = async (id) => {
        try {

            if (!id || !validator.isUUID(id)) return null;

            const genreData = await dbGenre.exists(id);

            return genreData;

        } catch (err) {
            console.error(err);

            return null;
        }
    }
}