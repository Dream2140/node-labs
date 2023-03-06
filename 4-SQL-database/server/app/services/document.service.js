const db = require('../database/db');

class DocumentService {

    async create(managerId, content) {
        return await db
            .query('INSERT INTO documents (manager_id, content) VALUES ($1, $2) RETURNING *', [managerId, content]);
    }

    async findAll() {
        return await db
            .query('SELECT * FROM documents ORDER BY id ASC');
    }

    async findOne(documentId) {
        return await db
            .query('SELECT * FROM documents WHERE id = $1', [documentId]);
    }

    async update(newDocumentData, documentId) {
        return await db
            .query('UPDATE documents row SET content = $1 WHERE id = $2 RETURNING row.*', [newDocumentData, documentId])
    }

    async delete(documentId) {
        return await db
            .query('DELETE FROM documents row WHERE id = $1 RETURNING row.*', [documentId]);
    }

    async deleteAll() {
        return await db
            .query('DELETE FROM documents row RETURNING *');
    }

    async updateManager(managerId, documentId) {
        return await db
            .query('UPDATE documents row SET manager_id = $1 WHERE id = $2 RETURNING row.*', [managerId, documentId]);
    }

    async findByManagerId(managerId) {
        return await db
            .query('SELECT * FROM documents WHERE manager_id = $1', [managerId]);
    }
};

module.exports = new DocumentService();
