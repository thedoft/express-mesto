const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const UnauthorizedError = require('../errors/unauthorized-err');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Johnny Knoxvill',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'The Jackass, Irving Zisman',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://mtv.mtvnimages.com/uri/mgid:ao:image:mtv.com:92917?quality=0.8&format=jpg&width=1440&height=810&.jpg',
    validate: {
      validator(v) {
        return v.match(/^(https?:\/\/)(www\.)?([\da-z-.]+)\.([a-z.]{2,6})[\da-zA-Z-._~:?#[\]@!$&'()*+,;=/]*\/?#?$/);
      },
      message: 'Строка должна содержать ссылку!',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function f(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((isMatched) => {
          if (!isMatched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
