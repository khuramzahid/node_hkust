const models = require('../models');
var passport = require('passport');
var authenticate = require('../authenticate');

const signupHandler = async (req, res, next) => {
  try {
    models.User.register(new models.User({username: req.body.username}), req.body.password, (err, user) => {
      if(err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: err});
      }
      else {
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      }
    });
  }
  catch(error) {
      next(error);
  }
}

const loginHandler = (req, res) => {
  var token = authenticate.getToken({username: req.body.username});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
}

const getAllUsers = async (req, res, next) => {
  try {
    const users = await models.User.findAll({
      attributes: ['id', 'username', 'admin']
    });
    res.json({
      users
    });
  }
  catch(error) {
    next(error);
  }
}

module.exports = {
    signupHandler,
    loginHandler,
    getAllUsers
}