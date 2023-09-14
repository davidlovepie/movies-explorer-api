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
    type: String,
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
      validator: (v) => /(https?:\/\/)(www)?([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=])*#?$/.test(v),
      message: 'Некорректная ссылка',
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
      validator: (v) => /(https?:\/\/)(www)?([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=])*#?$/.test(v),
      message: 'Некорректная ссылка',
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  movieId: {
    type: Number,
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