require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

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

app.use(express.static(path.join(__dirname, 'public')));

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((err, req, res, next) => {
  if (!err || err.message.includes('not found')) {
    next();
  } else if (err.message === 'Неправильные почта или пароль' || err.message === 'Необходима авторизация') {
    res.status(401).send({ message: err.message });
  } else if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(400).send({ message: `${err.name} - ${err.message}` });
  } else {
    res.status(500).send({ message: `${err.name} - ${err.message}` });
  }
});

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT);
