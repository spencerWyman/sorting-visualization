const User = require('../models/userSchema')

const userController = {};

userController.verifyUser = (req, res, next) => {
  User.findOne({ username: req.body.username, password: req.body.password }, function(err, doc) {
    if (err) {
      console.log("Error in finding User");
      return next(err);
    } else if (!doc) {
      return next("No such user exists.");
    } else {
      res.locals.username = req.body.username;
      res.locals.mastery = doc.mastery.join('*');
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

userController.updateMastery = (req, res, next) => {
  User.findOne({ username: req.cookies.username }, function(err, doc) {
    console.log('doc.username', doc.username);
    console.log('req.body', req.body);
    doc.mastery = req.body;
    console.log('updated doc.mastery', doc.mastery);
    doc.save()
    next();
  })
}

module.exports = userController;
