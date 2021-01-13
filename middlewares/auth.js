const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const UnauthorizedError = require('../errors/unauthorized-err');

const auth = (req, res, next) => {
  const authorization = req.cookies.jwt;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Токен не передан или передан не в том формате');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError('Передан некорректный токен');
  }

  req.user = payload;

  return next();
};

module.exports = auth;
