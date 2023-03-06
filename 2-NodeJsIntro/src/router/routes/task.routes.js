const taskController = require('../../controllers/task.controller');

const router = require('express').Router();

router.post('/', taskController.createTask);

router.get('/', taskController.findAllTasks);

router.get('/:id', taskController.findOneTask);

router.put('/:id', taskController.updateTask);

router.delete('/:id', taskController.deleteTask);

router.delete('/', taskController.deleteAllTasks);

module.exports = router;
