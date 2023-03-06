module.exports = {
  user: process.env.DB_USER,
  host: process.env.PSQL_HOST || process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: '5432'
};