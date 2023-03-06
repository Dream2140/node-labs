const db = require("../database/db");

const Director = db.director;

const validator = require('validator');

const Database = require('../database/dbApi');

const ErrorHandler = require('../helpers/errorHandler');

let directorErrorHandler = new ErrorHandler('Director')
let dbDirector = new Database(Director, directorErrorHandler);

module.exports = class DirectorService {

    createDirector = async (directorData) => {

        return await dbDirector.create(directorData);

    }

    findAllDirectors = async (req) => {

        return await dbDirector.findAll();

    }

    findOneByDirectortId = async (directorId) => {

        return await dbDirector.findOne(directorId);
    }

    updateDirector = async (directorId, newDirectorData) => {

        const directoExist = await this.checkDirectorExistance(directorId);

        if (!directoExist) {

            directorErrorHandler.triggerError({
                status: 400,
                message: "Director with this id was not found"
            });
        }

        return await dbDirector.update(directorId, newDirectorData);
    }

    checkDirectorExistance = async (id) => {
        try {
            if (!id || !validator.isUUID(id)) return false;

            return await dbDirector.exists(id);

        } catch (err) {
            console.error(err);

            return false;
        }
    };

    deleteDirector = async (directorId) => {

        return await dbDirector.delete(directorId);
    }

    deleteAlldirectors = async () => {

        return await dbDirector.deleteAll();

    }
}