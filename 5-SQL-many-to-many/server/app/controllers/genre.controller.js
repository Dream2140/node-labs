const GenreService = require('../services/genre.service.js');

const genreService = new GenreService();

class genreController {

    createGenre = async (req, res) => {

        try {

            const title = req.body.title;
            const genreFields = { title };

            const genreData = await genreService.createGenre(genreFields);

            return res.send(genreData);

        } catch (err) {
            console.error(err);

            res.status(err.cause?.status || 500).send({

                message: err.cause?.message || "Some error occurred while creating genre."
            });
        }
    };

    findAllGenres = async (req, res) => {
        try {

            const allGenresData = await genreService.findAllGenres(req);

            if (allGenresData.length === 0) {

                return res.send({ message: 'No genres found' });
            }

            return res.send(allGenresData);

        } catch (err) {
            console.error(err);

            res.status(err.cause?.status || 500).send({
                message: err.cause?.message || "Some error occurred while retriving list of genres."
            });
        }
    };

    findOneByGenreId = async (req, res) => {
        try {

            const genreId = req.params.id;

            const genreData = await genreService.findOneByGenreId(genreId);

            return res.send(genreData);

        } catch (err) {
            console.error(err);
            res.status(err.cause?.status || 500).send({
                message: err.cause?.message || `Some error occurred while finding genre`
            });
        }
    };

    async updateGenreTitle(req, res) {
        try {

            const genreId = req.params.id;
            const newGenreData = {
                title: req.body.title
            }

            const updatedGenreData = await genreService.updateGenreTitle(genreId, newGenreData);

            if (updatedGenreData[0] === 1) {

                return res.send({
                    message: `Genre was updated successfully`
                });
            }

            return res.send({
                message: `Cannot update genre. Maybe genre was not found or req.body is empty!`
            });

        } catch (err) {
            console.error(err);

            res.status(err.cause?.status || 500).send({
                message: err.cause?.message || `Some error occurred while updating genre`
            });
        }
    }

    async deleteGenre(req, res) {
        try {

            const genreId = req.params.id;

            const deleteGenreData = await genreService.deleteGenre(genreId);

            if (deleteGenreData === 1) {

                return res.send({
                    message: `Genre was deleted successfully.`
                });
            }

            return res.send({
                message: `Cannot delete genre. Maybe genre was not found or req.body is empty!`
            });

        } catch (err) {
            console.error(err);

            res.status(err.cause?.status || 500).send({
                message: err.cause?.message || `Some error occurred while deleting genre`
            });
        }
    }

    async deleteAllGenres(req, res) {
        try {

            const deletedGenresData = await genreService.deleteAllGenres(req);

            if (deletedGenresData === 0) {

                return res.send({
                    message: `Nothing to delete`
                });
            }

            return res.send({
                message: `${deletedGenresData} genres were deleted successfully!`
            });


        } catch (err) {
            console.error(err);

            res.status(err.cause?.status || 500).send({
                message: err.cause?.message || "Some error occurred while removing all genres."
            });
        }
    }

}

module.exports = new genreController();