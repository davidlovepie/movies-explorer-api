const Forbidden = require('../errors/Forbidden');
const NotFoundError = require('../errors/NotFoundError');
const {
  CREATED,
  NOT_FOUND_MOVIE_MSG,
  FORBIDDEN_MOVIE_MSG,
} = require('../utils/constans');
const Movie = require('../models/movie');

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((data) => {
      res.send({ data });
    })
    .catch((error) => {
      next(error);
    });
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    owner,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((data) => {
      res.status(CREATED).send({ data });
    })
    .catch((error) => {
      next(error);
    });
};

const deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  const userId = req.user._id;
  Movie.findOne({ _id })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NOT_FOUND_MOVIE_MSG);
      }
      if (userId !== movie.owner._id.toString()) {
        throw new Forbidden(FORBIDDEN_MOVIE_MSG);
      }
      Movie.findByIdAndRemove(_id)
        .then((data) => {
          if (!data) {
            throw new NotFoundError(NOT_FOUND_MOVIE_MSG);
          }
          res.send({ data });
        })
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
