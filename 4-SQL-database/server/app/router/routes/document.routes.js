const documentController = require('../../controllers/document.controller.js');
const router = require('express').Router();

router.post('/', documentController.createDocument);

router.get('/', documentController.findAllDocument);

router.get('/:id', documentController.findOneByDocumentId);

router.get('/managerId/:managerId', documentController.findByManagerId);

router.put('/documentId/:id', documentController.updateDocumentContent);

router.put('/documentManager/:id', documentController.updateDocumentManager);

router.delete('/:id', documentController.deleteDocument);

router.delete('/', documentController.deleteAllDocument);

module.exports = router;
