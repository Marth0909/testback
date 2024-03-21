const Actors = require("./Actors");
const Directors = require("./Directors");
const Genres = require("./Genres");
const Movies = require("./Movies");


Movies.belongsToMany(Genres, { through: 'movie_genre' });
Genres.belongsToMany(Movies, { through: 'movie_genre'});

Movies.belongsToMany(Actors, { through: 'movie_actor'});
Actors.belongsToMany(Movies, { through: 'movie_actor'});

Movies.belongsToMany(Directors, { through: 'movie_director'});
Directors.belongsToMany(Movies, { through: 'movie_director'});