const Forbidden = require('../errors/Forbidden');
const NotFoundError = require('../errors/NotFoundError');

const Movie = require('../models/movie');

const getMovies = (req, res, next) => {
  Movie.find({})
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
      res.status(201).send({ data });
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
        throw new NotFoundError('Фильм не найден');
      }
      if (userId !== movie.owner._id.toString()) {
        throw new Forbidden('Это не твой фильм. Пока');
      }
      Movie.findByIdAndRemove(_id)
        .then((data) => {
          if (!data) {
            throw new NotFoundError('Фильм не найден');
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

// const addLike = (req, res, next) => {
//   Movie.findByIdAndUpdate(
//     req.params.movieId,
//     { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
//     { new: true },
//   ).then((data) => {
//     if (!data) {
//       throw new NotFoundError('Фильм не найден');
//     }
//     res.send({ data });
//   })
//     .catch((error) => {
//       next(error);
//     });
// };

// const deleteLike = (req, res, next) => {
//   Movie.findByIdAndUpdate(
//     req.params.movieId,
//     { $pull: { likes: req.user._id } }, // убрать _id из массива
//     { new: true },
//   ).then((data) => {
//     if (!data) {
//       throw new NotFoundError('Фильм не найден');
//     }
//     res.send({ data });
//   })
//     .catch((error) => {
//       next(error);
//     });
// };

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
  // addLike,
  // deleteLike,
};
