var express = require('express');

const userRouter = express.Router();

const {
  signupHandler,
  loginHandler,
  logoutHandler
} = require('../dao/users');

userRouter
.post('/signup', signupHandler)
.post('/login', loginHandler)
.get('/logout', logoutHandler);

module.exports = userRouter;
