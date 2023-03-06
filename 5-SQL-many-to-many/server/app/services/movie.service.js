const db = require("../database/db");

const validator = require('validator');

const ErrorHandler = require('../helpers/errorHandler');

const Database = require('../database/dbApi');

const MovieGenreService = require('./movieGenre.service');

const DirectorService = require('./director.service');

const movieErrorHandler = new ErrorHandler('Movie');
const Movie = db.movie;
const dbMovie = new Database(Movie, movieErrorHandler);
const movieGenreService = new MovieGenreService();
const directorService = new DirectorService();

module.exports = class MovieService {

    async createMovie(directorId, movieFields, genres) {

        const directorExists = await directorService.checkDirectorExistance(directorId);

        if (!directorExists) {

            return movieErrorHandler.triggerError({
                status: 400,
                message: "Director with this id was not found"
            });
        }


        const movieData = await dbMovie.create(movieFields);

        if (genres && genres.length !== 0) {
            await movieGenreService.addGenreToMovie(genres, movieData.id);
        }

        return await this.getOneMovieData(movieData.id);
    }

    getOneMovieData = async (id) => {
        try {

            const movieData = await db.movie.findOne({
                include: [db.genre],
                where: { id }
            });

            if (!movieData) return null;

            const director = await db.director.findOne({
                where: { id: movieData.directorId }
            })

            director.get({ plain: true });

            const genres = Object.values(movieData.genres).map(item => {

                return item.id;
            })

            return {
                id: movieData.id,
                name: movieData.name,
                directorId: movieData.directorId,
                directorFullName: director.fullName,
                genres: { ...genres }
            };
        } catch (err) {
            console.error(err);

            return null;
        }
    }

    findAllMovies = async () => {

        const movieList = await db.movie.findAll({
            include: [db.genre]
        });

        Promise.all(
            movieList.map(async (item) => {

                const director = await db.director.findOne({
                    where: { id: item.directorId },
                });

                director?.get({ plain: true });

                return Promise.resolve({
                    id: item.id,
                    name: item.name,
                    directorId: item.directorId,
                    directorFullName: director?.fullName,
                    genres: item.genres
                });
            })
        )

        return movieList;
    }

    findOneByMovieId = async (movieId) => {

        return await this.getOneMovieData(movieId);
    }

    updateMovie = async (movieId, newMovieData, genre) => {

        if (newMovieData.directorId) {

            const directorExists = await directorService.checkDirectorExistance(newMovieData.directorId);

            if (!directorExists) {

                return movieErrorHandler.triggerError({
                    status: 400,
                    message: "Director with this id was not found"
                });
            }
        }

        if (genre && genre.length !== 0) {
            await movieGenreService.addGenreToMovie(genre, movieId);
        }

        return await dbMovie.update(movieId, newMovieData);

    }

    deleteMovie = async (movieId) => {

        return await dbMovie.delete(movieId);

    }

    deleteAllMovies = async () => {

        return await dbMovie.deleteAll();

    }

    updateMovieDirector = async (movieId, directorId) => {

        const directorExists = await directorService.checkDirectorExistance(directorId);

        if (!directorExists) {

            return movieErrorHandler.triggerError({
                status: 400,
                message: "Director with this id was not found"
            });
        }

        return await dbMovie.update(movieId, { directorId });

    }

    removeGenresFromMovie = async (movieId, genres) => {

        const movieExists = await this.checkMovieExistence(movieId);

        if (!movieExists) {

            return movieErrorHandler.triggerError({
                status: 400,
                message: "Movie with this id was not found"
            });
        }

        for (let genre in genres) {
            const genreExist = await genreController.checkGenreExistence(genres[genre]);

            if (!genreExist) {

                return movieErrorHandler.triggerError({
                    status: 400,
                    message: `Genre with this id ${genres[genre]} was not found`
                });
            }
        }

        return await movieGenreService.deleteGenreFromMovie(genres, movieId);
    }

    checkMovieExistence = async (id) => {
        try {
            if (!id || !validator.isUUID(id)) return null;

            return await dbMovie.exists(id);
        } catch (err) {
            console.error(err);

            return null;
        }
    }
}
