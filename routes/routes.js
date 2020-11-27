const router = require('express').Router();
const { sendUsers, sendUserById } = require('./users');
const sendCards = require('./cards');

router.get('/users', sendUsers);
router.get('/cards', sendCards);
router.get('/users/:id', sendUserById);

module.exports = router;
