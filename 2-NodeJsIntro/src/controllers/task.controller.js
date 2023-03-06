const DataService = require('../database/dataService');
const dbStorage = require('../db.json');

const path = './db.json';

const uuid = require('uuid');

const dataService = new DataService(dbStorage, path);

class taskController {

    createTask = async (req, res) => {

        try {

            if (Array.isArray(req.body)) {
                const tasksList = req.body;

                tasksList.forEach((item) => {
                    if (!item.header) {
                        res.status(400).send({
                            message: 'Invalid header'
                        });

                        return;
                    }

                    if (!item.text) {
                        res.status(400).send({
                            message: 'Invalid text'
                        });

                        return;
                    }
                });

                const newTasks = await dataService.create(tasksList);

                return res.send(newTasks);
            }

            const { header, text } = req.body;

            if (!header) {
                res.status(400).send({
                    message: 'Invalid header'
                });

                return;
            }

            if (!text) {
                res.status(400).send({
                    message: 'Invalid text'
                });

                return;
            }

            const taskData = {
                header, text
            }

            const newTask = await dataService.create(taskData);

            return res.send(newTask);

        } catch (err) {
            console.error(err);
            res.status(500).send({
                err,
                message: 'Some error occurred while creating task'
            });
        }
    }

    findOneTask = async (req, res) => {
        const id = req.params.id;

        try {
            if (!id || !uuid.validate(id)) {
                res.status(400).send({
                    message: 'Invalid id'
                });

                return;
            }

            const task = await dataService.get(id);

            return res.send(task);

        } catch (err) {
            console.error(err);
            res.status(500).send({
                err,
                message: `Some error occurred while finding task with id ${id}`
            });
        }
    }

    findAllTasks = async (req, res) => {
        try {
            const tasksList = await dataService.getAll();

            return res.send(tasksList);
        } catch (err) {
            console.error(err);
            res.status(500).send({
                err,
                message: `Some error occurred while retriving list of tasks`
            });
        }
    }

    updateTask = async (req, res) => {
        const id = req.params.id;
        const { header, text } = req.body;

        try {
            if (!id || !uuid.validate(id)) {
                res.status(400).send({
                    message: 'Invalid id'
                });

                return;
            }

            const newTaskData = {
                header, text
            }

            const updatedTask = await dataService.update(id, newTaskData);

            if (!updatedTask) {
                res.status(400).send({
                    message: `Task with id ${id} not found`
                });

                return;
            }

            return res.send(updatedTask);
        } catch (err) {
            console.error(err);
            res.status(500).send({
                err,
                message: `Some error occurred while updating task with id ${id}`
            });
        }
    }

    deleteTask = async (req, res) => {
        const id = req.params.id;

        try {
            if (!id || !uuid.validate(id)) {
                res.status(400).send({
                    message: 'Invalid id'
                });

                return;
            }

            const deletedTask = await dataService.deleteOne(id);

            if (!deletedTask) {
                res.status(400).send({
                    message: `Task with id ${id} not found`
                });

                return;
            }

            res.send({
                message: `Task with id ${id} successfully deleted`
            });


        } catch (err) {
            console.error(err);
            res.status(500).send({
                err,
                message: `Some error occurred while deleting task with id ${id}`
            });
        }
    }

    deleteAllTasks = async (req, res) => {
        try {
            await dataService.deleteAll();

            res.send({
                message: `All tasks successfully deleted`
            });

        } catch (err) {
            console.error(err);
            res.status(500).send({
                err,
                message: `Some error occurred while retriving list of tasks`
            });
        }
    }

}


module.exports = new taskController();