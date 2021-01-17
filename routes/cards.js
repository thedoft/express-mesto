const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', celebrate({
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
  params: Joi.object().keys({
    id: Joi.objectId(),
  }),
}), deleteCard);

router.put('/likes/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.objectId(),
  }),
}), likeCard);

router.delete('/likes/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.objectId(),
  }),
}), dislikeCard);

module.exports = router;
