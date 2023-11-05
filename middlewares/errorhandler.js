const { ValidationError, CastError, DocumentNotFoundError } = require('mongoose').Error;
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');
const NotFoundError = require('../errors/NotFoundError');
const Unauthorized = require('../errors/Unauthorized');
const Forbidden = require('../errors/Forbidden');
const {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  CONFLICT,
  SERVER_ERROR,
  NOT_FOUND,
  BAD_REQUEST_MSG,
  NOT_FOUND_MSG,
  CONFLICT_MSG,
  SERVER_ERROR_MSG,
} = require('../utils/constans');

module.exports = (err, req, res, next) => {
  if (err instanceof CastError || err instanceof ValidationError) {
    return res
      .status(BAD_REQUEST)
      .send({ message: BAD_REQUEST_MSG });
  }
  if (err instanceof DocumentNotFoundError) {
    return res
      .status(NOT_FOUND)
      .send({
        message: NOT_FOUND_MSG,
      });
  }
  if (err instanceof NotFoundError) {
    return res.status(NOT_FOUND).send({ message: err.message });
  }
  if (err instanceof Unauthorized) {
    return res.status(UNAUTHORIZED).send({ message: err.message });
  }
  if (err instanceof Conflict) {
    return res.status(CONFLICT).send({ message: err.message });
  }
  if (err instanceof BadRequest) {
    return res.status(BAD_REQUEST).send({ message: err.message });
  }
  if (err instanceof Forbidden) {
    return res.status(FORBIDDEN).send({ message: err.message });
  }
  if (err.code === 11000) {
    return res.status(CONFLICT).send({ message: CONFLICT_MSG });
  }
  res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);

  return next();
};
