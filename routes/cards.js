const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', celebrate({
  user: Joi.object().keys({
    _id: Joi.string().hex().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().uri({
      scheme: [
        'https',
        'http',
      ],
      allowQuerySquareBrackets: true,
    }).required(),
  }),
}), createCard);

router.delete('/:id', celebrate({
  user: Joi.object().keys({
    _id: Joi.string().hex().required(),
  }),
  params: Joi.object().keys({
    id: Joi.string().hex(),
  }),
}), deleteCard);

router.put('/:id/likes', celebrate({
  user: Joi.object().keys({
    _id: Joi.string().hex().required(),
  }),
  params: Joi.object().keys({
    id: Joi.string().hex(),
  }),
}), likeCard);

router.delete('/:id/likes', celebrate({
  user: Joi.object().keys({
    _id: Joi.string().hex().required(),
  }),
  params: Joi.object().keys({
    id: Joi.string().hex(),
  }),
}), dislikeCard);

module.exports = router;
