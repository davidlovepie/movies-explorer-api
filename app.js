require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const errorCelebrate = require('celebrate').errors;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const errorhandler = require('./middlewares/errorhandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const router = require('./routes/index.js');
const apiLimiter = require('./middlewares/ratelimiter');

const { DB_URL } = process.env;

const app = express();
app.use(cors);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL);

app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(apiLimiter);

app.use(router);

app.use(errorLogger);

app.use(errorCelebrate());

app.use(errorhandler);

app.listen(3000, () => {
  console.log('apple');
});
