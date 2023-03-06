const db = require('../database/db');

const validator = require('validator');

const managerController = require('../controllers/manager.controller.js');

const service = require('../services/document.service')

class DocumentController {

    createDocument = async (req, res) => {

        const { managerId, content } = req.body;

        if (!content) {
            return res.status(400).send({
                message: 'You have to set content'
            });

        }

        if (req.body.content.length < 5) {
            return res.status(400).send({
                message: 'Minimum size of the content 5 words'
            });
        }

        if (managerId && !validator.isUUID(managerId)) {
            return res.status(400).send({
                message: 'You have entered an invalid manager ID'
            });
        }

        if (managerId) {

            const managerExists = await managerController.checkExistanceManager(managerId);

            if (!managerExists) {
                return res.status(400).send({
                    message: 'Manager with this id was not found'
                });
            }
        }

        try {
            const documentData = service.create(managerId, content);

            return res.send(documentData.rows);
        } catch (err) {
            console.error(err);

            res.status(404).send({
                err,
                message: 'Some error occurred while creating Document.'
            });
        }
    }

    async findAllDocument(req, res) {
        try {
            const allDocumentsData = await service.findAll();

            if (allDocumentsData.rows.length === 0) {
                return res.send('No documents found');
            }

            return res.send(data.rows)

        } catch (err) {
            console.error(err);
            res.status(404).send({
                err,
                message: 'Some error occurred while retriving list of documents'
            });
        }
    };

    findOneByDocumentId = async (req, res) => {

        const documentId = req.params.id;

        try {
            const documentData = await service.findOne(documentId);

            return res.send(documentData.rows);
        } catch (err) {
            console.error(err);

            res.status(404).send({
                err,
                message: `Some error occurred while finding document with id ${managerId}.`
            });
        }
    };

    async updateDocumentContent(req, res) {

        const documentId = req.params.id;
        const newDocumentData = req.body.content;

        try {

            if (documentId && !validator.isUUID(documentId)) {
                return res.status(400).send({
                    message: 'You have entered an invalid document ID'
                });
            }

            if (newDocumentData && newDocumentData.length < 5) {
                return res.status(400).send({
                    message: 'Minimum size of the content 5 words'
                });
            }

            const updatedDocumentData = await service.update(newDocumentData, documentId);

            if (updatedDocumentData.rows.length === 0) {
                return res.send({
                    message: `Cannot update Document with id=${documentId}. Maybe Document was not found or req.body is empty!`
                });
            }

            return res.send({
                message: `Document witdh id ${documentId} was updated successfully.`
            });

        } catch (err) {
            console.error(err);

            res.status(404).send({
                err,
                message: `Error updating Document with id ${documentId}`
            });
        }
    }

    async deleteDocument(req, res) {

        const documentId = req.params.id;

        try {

            if (documentId && !validator.isUUID(documentId)) {
                res.status(400).send({
                    message: 'You have entered an invalid document ID'
                });

                return;
            }

            const deletedDocumentData = await service.delete(documentId);

            if (deletedDocumentData.rows.length === 0) {
                return res.send({
                    message: `Cannot delete with id=${documentId}. Maybe Document was not found or req.body is empty!`
                });

            }

            return res.send({
                message: `Document with id ${documentId} was deleted successfully.`
            });
        } catch (err) {
            console.error(err);

            res.status(404).send({
                err,
                message: `Error deleting Document with id ${documentId}`
            });
        }
    }

    async deleteAllDocument(req, res) {
        try {
            const deletedDocumentsData = await service.deleteAll();

            if (deletedDocumentsData.rows.length === 0) {
                return res.send({
                    message: `Nothing to delete`
                });
            }

            return res.send({
                message: `${deletedDocumentsData.rows.length} documents were deleted successfully!`
            });

        } catch (err) {
            console.error(err);

            res.status(404).send({
                err,
                message: 'Some error occurred while removing all documents.'
            });
        }
    }

    async updateDocumentManager(req, res) {
        const documentId = req.params.id;
        const managerId = req.body.managerId;

        try {

            if (managerId && !validator.isUUID(managerId)) {
                return res.status(400).send({
                    message: 'You have entered an invalid document ID'
                });
            }

            const managerExists = await managerController.checkExistanceManager(managerId).then(res => res);

            if (!managerExists) {
                return res.status(400).send({
                    message: 'Manager with this id was not found'
                });
            }

            const updatedDocumentData = await service.updateManager(managerId, documentId);

            if (updatedDocumentData.rows.length === 0) {
                return res.send({
                    message: `Cannot update Document with id=${documentId}. Maybe Document was not found or req.body is empty!`
                });
            }

            return res.send({
                message: `Document witdh id ${documentId} was updated successfully.`
            });

        } catch (err) {
            console.error(err);

            res.status(404).send({
                err,
                message: `Error updating Document with id ${documentId}`
            });
        }

    }

    findByManagerId = async (req, res) => {

        const managerId = req.params.managerId;

        try {
            if (managerId && !validator.isUUID(managerId)) {
                res.status(400).send({
                    message: 'You have entered an invalid document ID'
                });

                return;
            }

            const managerExists = await managerController.checkExistanceManager(managerId);

            if (!managerExists) {
                res.status(400).send({
                    message: 'Manager with this id was not found'
                });

                return;
            }

            const documentData = await service.findByManagerId(managerId);

            if (documentData.rows.length === 0) {
                return res.send({
                    message: `No documents found with id manager ${managerId}.`
                });

            }

            return res.send(data);

        } catch (err) {
            console.error(err);

            res.status(404).send({
                err,
                message: `Some error occurred while finding document with manager id ${managerId}.`
            });
        }
    };
}

module.exports = new DocumentController();