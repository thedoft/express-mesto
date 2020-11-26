const fsPromises = require('fs').promises;
const path = require('path');

const usersPath = path.join(__dirname, '../data/users.json');
const getUsers = () => fsPromises.readFile(usersPath, 'utf8');

module.exports = getUsers;
