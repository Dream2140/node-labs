module.exports = (pool) => {
  return pool.query(`CREATE TABLE IF NOT EXISTS "managers" (
      "id" uuid DEFAULT uuid_generate_v4(),
      "full_name" VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
  );`)
};