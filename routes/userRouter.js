var express = require('express');
var passport = require('passport');
const userRouter = express.Router();

const {
  signupHandler,
  loginHandler
} = require('../dao/users');

userRouter
.post('/signup', signupHandler)
.post('/login', passport.authenticate('local'), loginHandler);
// JWT auth is not like sessions. So no logout. 
// We do have the option to have token whitelist at server-side.
// Logout would mean removing those tokens from that whitelist.

module.exports = userRouter;
