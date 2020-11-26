const getUsers = require('./getUsers');

const sendUsers = (req, res) => {
  getUsers()
    .then((data) => {
      const users = JSON.parse(data);
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = sendUsers;
