const moviesRouter = require('express').Router();
const { getMovies } = require('../controllers/movies');
const { createMovie } = require('../controllers/movies');
const { deleteMovie } = require('../controllers/movies');
const validation = require('../middlewares/validation');

moviesRouter.get('/', getMovies);

moviesRouter.post('/', validation.validateMovie, createMovie);

moviesRouter.delete('/:_id', validation.validateMovieId, deleteMovie);

module.exports = moviesRouter;
