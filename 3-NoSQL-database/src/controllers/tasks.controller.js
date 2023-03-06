const taskService = require('../services/tasks.service');

class TasksController {

    createTask = async (req, res) => {
        try {

            const taskData = {
                title: req.body.title,
                text: req.body.text
            };

            const task = await taskService.createTask(taskData);

            return res.send(task);

        } catch (err) {
            console.error(err);

            res.status(err.cause?.status || 500).send({
                message: err.cause?.message || "Some error occurred while creating task."
            });
        }
    }

    getAllTasks = async (req, res) => {
        try {

            const task = await taskService.getAllTasks();

            return res.send(task);

        } catch (err) {
            console.error(err);

            res.status(err.cause?.status || 500).send({
                message: err.cause?.message || "Some error occurred while getting tasks list."
            });
        }
    }

    getTaskById = async (req, res) => {
        try {

            const id = req.params.id;

            const task = await taskService.getTaskById(id);

            return res.send(task);

        } catch (err) {
            console.error(err);

            res.status(err.cause?.status || 500).send({
                message: err.cause?.message || "Some error occurred while getting task."
            });
        }
    }

    updateTask = async (req, res) => {
        try {
            const id = req.params.id;
            const data = {
                title: req.body.title,
                text: req.body.text
            };

            const task = await taskService.updateTask(id, data);

            return res.send(task);

        } catch (err) {
            console.error(err);

            res.status(err.cause?.status || 500).send({
                message: err.cause?.message || "Some error occurred while updating task."
            });
        }
    }

    deleteTask = async (req, res) => {
        try {
            const id = req.params.id;

            const task = await taskService.deleteTask(id);

            if (!task) {

                return res.send({
                    message: `Cannot delete task. Maybe task was not found or req.body is empty!`
                });
            }

            return res.send({
                message: `Task  was deleted successfully.`
            });

        } catch (err) {
            console.error(err);

            res.status(err.cause?.status || 500).send({
                message: err.cause?.message || "Some error occurred while deleting task."
            });
        }
    }

    deleteAllTasks = async (req, res) => {
        try {

            const task = await taskService.deleteAllTasks();

            if (task.deletedCount > 0) {
                return res.send({
                    message: `${task.deletedCount} tasks were deleted successfully!`
                });
            }

            return res.send({
                message: `Nothing to delete`
            });

        } catch (err) {
            console.error(err);

            res.status(err.cause?.status || 500).send({
                message: err.cause?.message || "Some error occurred while deleting tasks list."
            });
        }
    }
}

module.exports = new TasksController();