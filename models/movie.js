const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },

  director: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  year: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /\/uploads\/[^/]+\.(jpg|jpeg|png|gif|bmp|ico|svg|webp)/.test(v),
      message: 'Некорректная ссылка!',
    },
  },

  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /(https?:\/\/)(www)?([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=])*#?$/.test(v),
      message: 'Некорректная ссылка',
    },
  },

  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /\/uploads\/[^/]+\.(jpg|jpeg|png|gif|bmp|ico|svg|webp)/.test(v),
      message: 'Некорректная ссылка',
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  movieId: {
    type: Number,
    required: true,
  },

  nameRU: {
    type: String,
    required: true,
  },

  nameEN: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('movie', movieSchema);
