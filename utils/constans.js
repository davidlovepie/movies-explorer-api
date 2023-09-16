const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const CONFLICT = 409;
const SERVER_ERROR = 500;
const NOT_FOUND = 404;

const BAD_REQUEST_MSG = 'Переданы некорректные данные';
const NOT_FOUND_MSG = 'Пользователь не найден';
const NOT_FOUND_MOVIE_MSG = 'Фильм не найден';
const NOT_FOUND_PAGE_MSG = 'Cтраница не найдена';
const CONFLICT_MSG = 'Почта уже зарегистрирована';
const SERVER_ERROR_MSG = 'Ошибка на сервере';
const FORBIDDEN_MOVIE_MSG = 'Это не твой фильм. Пока';
const UNAUTHORIZED_MSG = 'Неправильные почта или пароль';
const AUTHORIZED_REQUIRE_MSG = 'Необходима авторизация';
const OK_SIGNOUT_MSG = 'Вы успешно вышли из системы';

module.exports = {
  OK,
  CREATED,
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
  NOT_FOUND_MOVIE_MSG,
  FORBIDDEN_MOVIE_MSG,
  UNAUTHORIZED_MSG,
  OK_SIGNOUT_MSG,
  AUTHORIZED_REQUIRE_MSG,
  NOT_FOUND_PAGE_MSG,
};
