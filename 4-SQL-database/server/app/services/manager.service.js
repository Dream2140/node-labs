const db = require('../database/db');

 class ManagerService {

    async create(fullName) {
        return await db
            .query(`INSERT INTO managers (full_name) VALUES ($1) RETURNING *`, [fullName])
    }

    async findAll() {
        return await db
            .query('SELECT * FROM managers ORDER BY id ASC')
    }

    async findOne(managerId) {
        return await db
            .query('SELECT * FROM managers WHERE id = $1', [managerId])
    }

    async update(newManagerName, id) {
        return await db
            .query('UPDATE managers row SET content = $1 WHERE id = $2 RETURNING row.*', [newManagerName, id])
    }

    async delete(id) {
        return await db
            .query('DELETE FROM managers row WHERE id = $1 RETURNING row.*', [id])
    }

    async deleteAll() {
        return await db
            .query('DELETE FROM managers row RETURNING *')
    }

    async checkExistance(managerId) {
        return await db
            .query('SELECT * FROM managers WHERE id = $1', [managerId])
    }
};

module.exports = new ManagerService();