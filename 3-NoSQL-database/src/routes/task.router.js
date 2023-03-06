const express = require('express');

const router = express();

const taskController = require('../controllers/tasks.controller');

const createTaskValidator = require('../validators/tasks/createTaskValidator');
const updateTaskValidator = require('../validators/tasks/updateTaskValidator');
const getTaskValidator = require('../validators/tasks/getTaskValidator');
const deleteTaskValidator = require('../validators/tasks/deleteTaskValidator');

router.get('/', taskController.getAllTasks);
router.get('/:id', getTaskValidator, taskController.getTaskById);
router.post('/', createTaskValidator, createTaskValidator, taskController.createTask);
router.put('/:id', updateTaskValidator, taskController.updateTask);
router.delete('/:id', deleteTaskValidator, taskController.deleteTask);
router.delete('/', taskController.deleteAllTasks);

module.exports = router;