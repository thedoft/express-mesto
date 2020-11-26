const getCards = require('./getCards');

const sendCards = (req, res) => {
  getCards()
    .then((data) => {
      const cards = JSON.parse(data);
      res.send(cards);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = sendCards;
