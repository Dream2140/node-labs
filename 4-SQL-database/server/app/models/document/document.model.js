module.exports = (pool) => {
    return pool.query(`CREATE TABLE IF NOT EXISTS "documents" (
        "id" uuid DEFAULT uuid_generate_v4(),
        "content" text NOT NULL,
      PRIMARY KEY (id),
      "manager_id" uuid references managers(id)
    );`);
};