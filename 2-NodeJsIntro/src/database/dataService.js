const fs = require('fs').promises;
const uuid = require('uuid');

module.exports = class DataService {

    constructor(db, path) {
        this.db = db;
        this.path = path;
    }

    create = async (inputData) => {
        try {
            let data = await this.getAll();

            if (Array.isArray(inputData)) {

                inputData.forEach(item => item.id = uuid.v4());
                data = [...data, ...inputData];
            } else {

                inputData.id = uuid.v4();
                data.push(inputData);
            }

            await this.writeData(data);

            return inputData;

        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    get = async (id) => {
        try {
            const data = await this.getAll();

            return data.find(item => item.id === id);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    update = async (id, inputData) => {
        try {
            const data = await this.getAll();

            const dataIndex = data.findIndex(item => item.id === id);

            if (dataIndex === -1) return null;

            const newData = {
                ...data[dataIndex],
                ...inputData
            };

            data[dataIndex] = newData;

            await this.writeData(data);

            return newData;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    deleteOne = async (id) => {
        try {
            let data = await this.getAll();

            if (!data.find(item => item.id === id)) return null;

            data = data.filter(item => item.id !== id);

            await this.writeData(data);

            return data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    deleteAll = async (id) => {
        try {
            await this.writeData([]);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    getAll = async () => {
        try {

            const data = await fs.readFile(this.path);

            return JSON.parse(data);

        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    writeData = async (data) => {
        try {
            await fs.writeFile(this.path, JSON.stringify(data));

        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}