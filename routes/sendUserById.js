const getUsers = require('./getUsers');

const sendUserById = (req, res) => {
  getUsers()
    .then((data) => {
      const users = JSON.parse(data);
      const currentUser = users.find((u) => u._id === req.params.id);

      if (currentUser === undefined) {
        res.send({ message: 'Нет пользователя с таким id' });
        return;
      }
      res.send(currentUser);
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

module.exports = sendUserById;
