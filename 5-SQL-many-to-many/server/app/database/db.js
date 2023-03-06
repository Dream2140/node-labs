const dbConfig = require("./db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: process.env.PSQL_HOST || "localhost",
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.director = require("../models/director.model.js")(sequelize, Sequelize);
db.movie = require("../models/movie.model.js")(sequelize, Sequelize);
db.genre = require("../models/genre.model.js")(sequelize, Sequelize);
db.movie_genre = require("../models/movieGenre.model.js")(sequelize, Sequelize);


db.director.hasMany(db.movie, { onDelete: 'cascade' });

db.movie.belongsToMany(db.genre, {
  through: db.movie_genre,
});

db.genre.belongsToMany(db.movie, {
  through: db.movie_genre,
});

module.exports = db;