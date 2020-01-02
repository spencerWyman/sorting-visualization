const User = require('../models/userSchema')

const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  const value = res.locals.user;
  console.log('value is', value);
  res.cookie('mastery', res.locals.user);
  next();
}

module.exports = cookieController;
