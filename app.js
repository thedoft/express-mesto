require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');

const { createUser, login, signout } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { corsConfig } = require('./middlewares/cors');
const { createUserValidation, loginValidation } = require('./middlewares/celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./errors/not-found-err');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

app.use('*', cors(corsConfig));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', createUserValidation, createUser);
app.post('/signin', loginValidation, login);

app.use(auth);
app.use(require('./routes/index'));

app.get('/signout', signout);
app.get('*', () => {
  try {
    throw new NotFoundError('Запрашиваемый ресурс не найден');
  } catch (err) {
    throw new NotFoundError('Запрашиваемый ресурс не найден');
  }
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode, message } = err;

  if (statusCode) {
    return res.status(statusCode).send({ message });
  }

  return next();
});

app.use((req, res) => res.status(500).send({ message: 'На сервере произошла ошибка' }));

app.listen(PORT);
