const router = require('express').Router();

const {
  getUserByIdValidation,
  updateUserInfoValidation,
  updateUserAvatarValidation,
} = require('../middlewares/celebrate');

const {
  getCurrentUserInfo,
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/me', getCurrentUserInfo);
router.get('/', getUsers);
router.get('/:id', getUserByIdValidation, getUserById);
router.patch('/me', updateUserInfoValidation, updateUserInfo);
router.patch('/me/avatar', updateUserAvatarValidation, updateUserAvatar);

module.exports = router;
