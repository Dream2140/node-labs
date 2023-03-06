module.exports = class Database {

    constructor(model, errorHandler) {

        this.model = model;
        this.errorHandler = errorHandler;

    }

    create = async (data) => {

        const id = data.id;

        if (id) {
            const exists = await this.exists(id);

            if (exists) {
                this.errorHandler.error(this.errorHandler.dublicateError);
            }
        }

        return await this.model.create(data);

    }

    exists = async (id) => {

        const result = await this.model.findByPk(id);

        return !!result === true;

    }

    findOne = async (id) => {

        if (!id) {
            this.errorHandler.error(this.errorHandler.emptyId);
        }

        const data = await this.model.findAll({
            where: { id }
        });

        if (Object.entries(data).length === 0) {
            this.errorHandler.error(this.errorHandler.notFound);
            return;
        }

        return data;

    }

    findAll = async (condition) => {

        if (condition) {

            return await this.model.findAll(condition);
        }

        return await this.model.findAll();
    }

    update = async (id, newData) => {

        if (!id) {
            this.errorHandler.error(this.errorHandler.emptyId);
        }

        return await this.model.update(newData, {
            where: { id }
        });

    }

    delete = async (id) => {

        if (!id) {
            this.errorHandler.error(this.errorHandler.emptyId);
        }

        return await this.model.destroy({
            where: { id }
        });

    }

    deleteAll = async () => {

        return await this.model.destroy({
            where: {},
            truncate: false
        });
    }
}