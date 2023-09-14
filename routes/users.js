const usersRouter = require('express').Router();
const { updateProfile } = require('../controllers/users');
const { getUserInfo } = require('../controllers/users');
const validation = require('../middlewares/validation');

usersRouter.get('/me', getUserInfo);

usersRouter.patch('/me', validation.validateProfile, updateProfile);

module.exports = usersRouter;
