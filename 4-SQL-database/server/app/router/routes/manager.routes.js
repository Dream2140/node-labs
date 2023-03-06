
const managerController = require('../../controllers/manager.controller.js');
const router = require('express').Router();

router.post('/', managerController.createManager);

router.get('/', managerController.findAllManagers);

router.get('/:id', managerController.findOneManager);

router.put('/:id', managerController.updateManager);

router.delete('/:id', managerController.deleteManager);

router.delete('/', managerController.deleteAllManagers);

module.exports = router;