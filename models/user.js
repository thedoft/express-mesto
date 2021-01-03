const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return v.match(/^(https?:\/\/)(www\.)?([\da-z-]+)\.([a-z.]{2,6})[\da-z-._~:?#[\]@!$&'()*+,;=/]*\/?#?$/);
      },
      message: 'Строка должна содержать ссылку!',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
