const User = require('../models/userSchema')

userController = {};

userController.verifyUser = (req, res, next) => {
  User.findOne({ username: req.body.username, password: req.body.password }, function(err, doc) {
    if (err) {
      console.log("Error in finding User");
      return next(err);
    } else if (!doc) {
      return next("No such user exists.");
    } else {
      return next();
    }
  })
}

userController.createUser = (req, res, next) => {
  User.create({ username: req.body.username, password: req.body.password},
  function(err) {
    if (err) {
      console.log("Error in creating User");
      return next(err);
    } else {
      return next();
    }
  })
}

module.exports = userController;
