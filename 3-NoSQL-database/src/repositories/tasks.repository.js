const Task = require('../models/tasks.model');

const triggerError = require('../helpers/error');

class TaskRepository {
    
    createTask = async (taskData) => {
        try {

            return await Task.create(taskData);

        } catch (error) {

            console.error(error);

            triggerError({
                status: 500,
                message: 'DB error while creating task'
            });
        }
    }

    getAllTasks = async () => {
        try {

            return await Task.find();

        } catch (error) {

            console.error(error);

            triggerError({
                status: 500,
                message: 'DB error while getting tasks list'
            });
        }
    }

    getTaskById = async (id) => {
        try {

            return await Task.findById(id);

        } catch (error) {

            console.error(error);

            triggerError({
                status: 500,
                message: 'DB error while finding task by id'
            });
        }
    }

    updateTask = async (id, data) => {
        try {

            return await Task.findByIdAndUpdate(id, data, { new: true });

        } catch (error) {

            console.error(error);

            triggerError({
                status: 500,
                message: 'DB error while updating task by id'
            });
        }
    }

    deleteTask = async (id) => {
        try {

            return await Task.findByIdAndDelete(id);

        } catch (error) {

            console.error(error);

            triggerError({
                status: 500,
                message: 'DB error while deleting task by id'
            });
        }
    }

    deleteAllTasks = async () => {
        try {

            return await Task.deleteMany();

        } catch (error) {

            console.error(error);

            triggerError({
                status: 500,
                message: 'DB error while deleting tasks list'
            });
        }
    }
}

module.exports = new TaskRepository();