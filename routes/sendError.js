const sendError = (req, res) => {
  res.send({ message: 'Запрашиваемый ресурс не найден' });
};

module.exports = sendError;
