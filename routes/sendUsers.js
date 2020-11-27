const getUsers = require('./getUsers');

const sendUsers = (req, res) => {
  getUsers()
    .then((data) => {
      const users = JSON.parse(data);
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

module.exports = sendUsers;
