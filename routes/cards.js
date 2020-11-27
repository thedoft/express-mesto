const getCards = require('../helpers/getCards');

const sendCards = (req, res) => {
  getCards()
    .then((data) => {
      const cards = JSON.parse(data);
      res.send(cards);
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

module.exports = sendCards;
