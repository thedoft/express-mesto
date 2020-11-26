const router = require('express').Router();
const sendUsers = require('./sendUsers');
const sendCards = require('./sendCards');
const sendUserById = require('./sendUserById');
const sendError = require('./sendError');

router.get('/users', sendUsers);
router.get('/cards', sendCards);
router.get('/users/:id', sendUserById);
router.get('/*', sendError);

module.exports = router;
