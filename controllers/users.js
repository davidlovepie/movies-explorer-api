const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const User = require('../models/user');

const Unauthorized = require('../errors/Unauthorized');
const NotFoundError = require('../errors/NotFoundError');

const {
  NOT_FOUND_MSG,
  UNAUTHORIZED_MSG,
  OK_SIGNOUT_MSG,
} = require('../utils/constans');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((data) => {
      const user = User.findById(data._id).select('-password');
      return user;
    })
    .then((data) => {
      res.status(201).send({ data });
    })
    .catch((error) => {
      next(error);
    });
};

const updateProfile = (req, res, next) => {
  const { _id } = req.user;
  const { name, email } = req.body;

  User.findByIdAndUpdate(_id, { name, email }, { new: true, runValidators: true })
    .then((data) => {
      if (!data) {
        throw new NotFoundError(NOT_FOUND_MSG);
      }
      res.send({ data });
    })
    .catch((error) => {
      next(error);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized(UNAUTHORIZED_MSG));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Unauthorized(UNAUTHORIZED_MSG));
          }
          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true })
        .status(200)
        .json({ token });
    })
    .catch((error) => {
      next(error);
    });
};

const getUserInfo = (req, res, next) => {
  const { _id } = req.user;
  User.findById({ _id })
    .then((data) => {
      if (!data) {
        throw new NotFoundError(NOT_FOUND_MSG);
      }
      res.send({ data });
    })
    .catch((error) => {
      next(error);
    });
};

const signOut = (req, res, next) => {
  try {
    res
      .clearCookie('jwt', { httpOnly: true })
      .status(200)
      .send(OK_SIGNOUT_MSG);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  updateProfile,
  login,
  getUserInfo,
  signOut,
};
