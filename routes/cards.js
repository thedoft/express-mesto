const router = require('express').Router();

const {
  createCardValidation,
  deleteCardValidation,
  changeCardLikeStatusValidation,
} = require('../middlewares/celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCardValidation, createCard);
router.delete('/:id', deleteCardValidation, deleteCard);
router.put('/:id/likes', changeCardLikeStatusValidation, likeCard);
router.delete('/:id/likes', changeCardLikeStatusValidation, dislikeCard);

module.exports = router;
