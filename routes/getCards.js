const path = require('path');
const fsPromises = require('fs').promises;

const cardsPath = path.join(__dirname, '../data/cards.json');
const getCards = () => fsPromises.readFile(cardsPath, 'utf8');

module.exports = getCards;
