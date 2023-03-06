const taskRepository = require('../repositories/tasks.repository');

class TasksService {

    createTask = async (taskData) => {

        return await taskRepository.createTask(taskData);

    }

    getAllTasks = async () => {

        return await taskRepository.getAllTasks();

    }

    getTaskById = async (id) => {

        return await taskRepository.getTaskById(id);

    }

    updateTask = async (id, data) => {

        return await taskRepository.updateTask(id, data);

    }

    deleteTask = async (id) => {

        return await taskRepository.deleteTask(id);

    }

    deleteAllTasks = async () => {

        return await taskRepository.deleteAllTasks();

    }
}

module.exports = new TasksService();