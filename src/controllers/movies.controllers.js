const catchError = require('../utils/catchError');
const Movies = require('../models/Movies');
const Actors = require('../models/Actors');
const Directors = require('../models/Directors');
const Genres = require('../models/Genres');


const getAll = catchError(async(req, res) => {
    const moviesall = await Movies.findAll({include:[Genres, Actors, Directors]});
    return res.json(moviesall)
});

const create = catchError(async(req, res) => {
    const resp = await Movies.create(req.body);
    return res.status(201).json(resp);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const resp = await Movies.findByPk(id);
    if(!resp) return res.sendStatus(404);
    return res.json(resp);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Movies.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const resp = await Movies.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(resp[0] === 0) return res.sendStatus(404);
    return res.json(resp[1][0]);
});
const  setMovieGenres = catchError(async(req, res) =>{
const {id}= req.params;
 const movie = await Movies.findByPk(id);
 if(!movie)
 return res.status(404).json({
    message: "No se encuentra esta pelicula"
});
await movie.setGenres(req.body);
const genres = await movie.getGenres();
return res.json(genres)
});
const  setMovieActors = catchError(async(req, res) =>{
const {id}= req.params;
 const movie = await Movies.findByPk(id);
 if(!movie)
 return res.status(404).json({
    message: "No se encuentra esta pelicula"
});
await movie.setActors(req.body);
const actors = await movie.getActors();
return res.json(actors)
});
const  setMovieDirectors = catchError(async(req, res) =>{
const {id}= req.params;
 const movie = await Movies.findByPk(id);
  if(!movie)
return res.status(404).json({
message: 'mensaje a desplegar'
});
await movie.setDirectors(req.body);
const directors = await movie.getDirectors();
return res.json(directors)
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setMovieGenres,
    setMovieActors,
    setMovieDirectors
}