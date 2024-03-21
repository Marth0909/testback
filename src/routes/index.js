const express = require('express');
const actorsRouter = require('./actors.router');
const directorsRouter = require('./directors.router');
const genresRouter = require('./genres.router');
const moviesRouter = require('./movies.router');
const router = express.Router();

// colocar las rutas aquí
router.use(actorsRouter)
router.use(directorsRouter)
router.use(genresRouter)
router.use(moviesRouter)

module.exports = router;