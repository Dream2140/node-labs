module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    define: {
      timestamps: false
    },
    PORT: 5432,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    } 
  };