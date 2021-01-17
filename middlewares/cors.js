module.exports.corsConfig = {
  origin: [
    'https://thedoft.mesto.students.nomoredomains.rocks',
    'http://thedoft.mesto.students.nomoredomains.rocks',
    'http://localhost:3001',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Origin', 'Referer', 'Accept', 'Authorization'],
  credentials: true,
};
