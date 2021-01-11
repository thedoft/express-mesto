require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((err, req, res, next) => {
  const { statusCode, message } = err;

  if (statusCode) {
    res.status(statusCode).send({ message });
  }

  next();
});

app.use((req, res) => res.status(500).send({ message: 'На сервере произошла ошибка' }));

app.listen(PORT);
