const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { login, createUser, signOut } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const validation = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');
const {
  NOT_FOUND_PAGE_MSG,
} = require('../utils/constans');

router.use('/users', auth, usersRouter);

router.use('/movies', auth, moviesRouter);

router.post('/signin', validation.validateSignin, login);

router.post('/signup', validation.validateSignup, createUser);

router.post('/signout', auth, signOut);

router.use('*', () => {
  throw new NotFoundError(NOT_FOUND_PAGE_MSG);
});

module.exports = router;
