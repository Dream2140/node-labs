const MovieService = require("../services/movie.service");

const movieService = new MovieService();

class movieController {


    createMovie = async (req, res) => {
        try {

            const { name, directorId, genres } = req.body;
            const movieFields = {
                name,
                directorId
            };

            const createdMovie = await movieService.createMovie(directorId, movieFields, genres);

            return res.send(createdMovie);

        } catch (err) {
            console.error(err);

            res.status(err.cause?.status || 500).send({
                message: err.cause?.message || "Some error occurred while creating movie."
            });
        }
    };

    findAllMovies = async (req, res) => {
        try {

            const movieList = await movieService.findAllMovies(req);

            if (movieList.length === 0) {

                return res.send({
                    message: "Movie list are empty"
                });
            }

            return res.send(movieList)

        } catch (err) {
            console.error(err);

            res.status(err.cause?.status || 500).send({

                message: err.cause?.message || "Some error occurred while retriving list of movies."
            });
        }
    };

    findOneByMovieId = async (req, res) => {
        try {

            const movieId = req.params.id;

            const movieData = await movieService.findOneByMovieId(movieId);

            return res.send(movieData);

        } catch (err) {
            console.error(err);

            res.status(err.cause?.status || 500).send({
                message: err.cause?.message || `Some error occurred while finding movie.`
            });
        }
    };

    async updateMovie(req, res) {
        try {

            const movieId = req.params.id;
            const { name, directorId, genre } = req.body;

            const newMovieData = {
                name,
                directorId
            };

            const updatedMovieData = await movieService.updateMovie(movieId, newMovieData, genre);

            if (updatedMovieData[0] === 1) {

                return res.send({
                    message: `Movie was updated successfully`
                });
            }

            return res.send({
                message: `Cannot update movie. Maybe movie was not found or req.body is empty!`
            });


        } catch (err) {
            console.error(err);

            res.status(err.cause?.status || 500).send({
                message: err.cause?.message || `Some error occurred while updating movie`
            });
        }
    }

    async deleteMovie(req, res) {
        try {

            const movieId = req.params.id;

            const deletedMovieData = await movieService.deleteMovie(movieId);

            if (deletedMovieData === 1) {

                return res.send({
                    message: `Movie with id ${movieId} was deleted successfully.`
                });
            }

            return res.send({ message: `Cannot delete movie with id=${movieId}. Maybe movie was not found or req.body is empty!` });

        } catch (err) {
            console.error(err);

            res.status(err.cause?.status || 500).send({
                message: err.cause?.message || `Error deleting movie`
            });
        }
    }

    async deleteAllMovies(req, res) {
        try {

            const deletedMoviesData = await movieService.deleteAllMovies(req);

            if (deletedMoviesData === 0) {

                return res.send({
                    message: `Nothing to delete`
                });
            }

            return res.send({
                message: `${deletedMoviesData} movies were deleted successfully!`
            });


        } catch (err) {
            console.error(err);

            res.status(err.cause?.status || 500).send({
                message: err.cause?.message || "Some error occurred while removing all movies."
            });
        }
    }

    async updateMovieDirector(req, res) {
        try {

            const movieId = req.params.id;
            const directorId = req.body.directorId;

            const updatedMovieData = await movieService.updateMovieDirector(movieId, directorId);

            if (updatedMovieData === 1) {
                return res.send({
                    message: `Movie was updated successfully. New director id - ${directorId}`
                });
            }

            return res.send({
                message: `Cannot update movie. Maybe movie was not found or req.body is empty!`
            });

        } catch (err) {
            console.error(err);

            res.status(err.cause?.status || 500).send({
                message: err.cause?.message || `Error updating movie`
            });
        }
    }

    removeGenresFromMovie = async (req, res) => {
        try {

            const movieId = req.params.id;
            const genres = req.body.genre;

            const updatedMovieData = await movieService.removeGenresFromMovie(movieId, genres);

            return res.send({
                message: `Genres was successfully deleted`
            });

        } catch (err) {
            console.error(err);

            res.status(err.cause?.status || 500).send({
                message: err.cause?.message || `Error updating movie`
            });
        }
    }
}

module.exports = new movieController();