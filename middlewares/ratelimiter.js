const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // ограничение: 100 запросов за указанный промежуток времени
  message: 'Слишком много запросов с этого IP, пожалуйста, попробуйте снова через 15 минут'
});

module.exports = apiLimiter;
