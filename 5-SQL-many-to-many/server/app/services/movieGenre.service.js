const db = require("../database/db");

const MovieGenre = db.movie_genre;

module.exports = class MovieGenreService {

    addGenreToMovie = async (idList, movieId) => {
        for (let id in idList) {

            const genreId = idList[id];

            const genre = await db.genre.findOne({
                where: { id: genreId },
            });

            if (!genre) return 0;

            const movieExistance = await db.movie_genre.findOne({
                where: { movieId, genreId },
            });

            if (movieExistance) return 0;

            await db.movie_genre.create({ genreId, movieId });
        }
    }

    deleteGenreFromMovie = async (genres, movieId) => {

        if (!movieId) return;

        Promise.all(
            Object.values(genres).map(async (item) => {
                await MovieGenre.destroy({
                    where: { genreId: item, movieId }
                });
            })
        );
    }
}
