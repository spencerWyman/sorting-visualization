const User = require('../models/userSchema')

const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  res.cookie('username', res.locals.username)
  res.cookie('mastery', res.locals.mastery);
  next();
}

module.exports = cookieController;
