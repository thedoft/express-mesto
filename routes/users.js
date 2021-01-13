const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCurrentUserInfo,
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/me', celebrate({
  user: Joi.object().keys({
    _id: Joi.string().hex().required(),
  }),
}), getCurrentUserInfo);

router.get('/', getUsers);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  user: Joi.object().keys({
    _id: Joi.string().hex().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUserInfo);

router.patch('/me/avatar', celebrate({
  user: Joi.object().keys({
    _id: Joi.string().hex().required(),
  }),
  body: Joi.object().keys({
    avatar: Joi.string().uri({
      scheme: [
        'https',
        'http',
      ],
      allowQuerySquareBrackets: true,
    }).required(),
  }),
}), updateUserAvatar);

module.exports = router;
