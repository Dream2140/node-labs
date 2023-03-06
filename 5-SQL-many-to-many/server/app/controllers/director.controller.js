const DirectorService = require('../services/director.service.js');

const directorService = new DirectorService();

class DirectorController {

    createDirector = async (req, res) => {
        try {

            const { fullName, birth } = req.body;

            const createdDirector = await directorService.createDirector({ fullName, birth });

            return res.send(createdDirector);

        } catch (err) {
            console.error(err);

            res.status(err.cause?.status || 500).send({
                message: err.cause?.message || "Some error occurred while creating director."
            });
        }
    };

    findAllDirectors = async (req, res) => {
        try {

            const allDirectorsData = await directorService.findAllDirectors(req);

            if (allDirectorsData.length === 0) {

                return res.send({ message: 'No directors found' });
            }

            return res.send(allDirectorsData);

        } catch (err) {
            console.error(err);

            res.status(err.cause?.status || 500).send({
                message: err.cause?.message || "Some error occurred while retriving list of directors."
            });
        }
    };

    findOneByDirectortId = async (req, res) => {
        try {

            const directorId = req.params.id;

            const directorData = await directorService.findOneByDirectortId(directorId);

            return res.send(directorData);

        } catch (err) {
            console.error(err);

            res.status(err.cause?.status || 500).send({
                message: err.cause?.message || `Some error occurred while finding director`
            });
        }
    };

    updateDirector = async (req, res) => {
        try {

            const directorId = req.params.id;
            const { birth, fullName } = req.body;

            const newDirectorData = {
                fullName, birth
            }

            const updatedDirectorData = await directorService.updateDirector(directorId, newDirectorData);

            if (updatedDirectorData[0] === 1) {

                return res.send({
                    message: `Director was updated successfully`
                });
            }

            return res.send({
                message: `Cannot update director. Maybe director was not found or req.body is empty!`
            });


        } catch (err) {
            console.error(err);

            res.status(err.cause?.status || 500).send({
                message: err.cause?.message || `Some error occurred while updating director`
            });
        }
    }

    deleteDirector = async (req, res) => {
        try {

            const directorId = req.params.id;

            const deletedDirectorData = await directorService.deleteDirector(directorId);

            if (deletedDirectorData == 1) {

                return res.send({
                    message: `Director  was deleted successfully.`
                });
            }

            return res.send({
                message: `Cannot delete director. Maybe director was not found or req.body is empty!`
            });


        } catch (err) {
            console.error(err);

            res.status(err.cause?.status || 500).send({
                message: err.cause?.message || `Some error occurred while deleting director`
            });
        }
    }

    deleteAlldirectors = async (req, res) => {
        try {

            const deletedDirectorsData = await directorService.deleteDirector(req);

            if (deletedDirectorsData === 0) {

                return res.send({
                    message: `Nothing to delete`
                });
            }

            return res.send({
                message: `${deletedDirectorsData} directors were deleted successfully!`
            });

        } catch (err) {
            console.error(err);

            res.status(err.cause?.status || 500).send({
                message: err.cause?.message || "Some error occurred while removing all directors."
            });
        }
    }
}

module.exports = new DirectorController();
