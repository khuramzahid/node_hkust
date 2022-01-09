var express = require('express');
var passport = require('passport');
const userRouter = express.Router();

const {
  signupHandler,
  loginHandler,
  logoutHandler
} = require('../dao/users');

userRouter
.post('/signup', signupHandler)
.post('/login', passport.authenticate('local'), loginHandler)
.get('/logout', logoutHandler);

module.exports = userRouter;
