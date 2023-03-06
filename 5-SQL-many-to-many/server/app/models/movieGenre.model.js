module.exports = (sequelize, Sequelize) => {
    const movie_genre = sequelize.define("movie_genre", {},{timestamps: false});
    
    return movie_genre;
};