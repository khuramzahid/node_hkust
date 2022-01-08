const models = require('../models');

const signupHandler = async (req, res, next) => {
    try {
      let {
        username,
        password
      } = req.body;
  
      const insertedUser = await models.User.create({
        username,
        password,
        createdAt: new Date(),
        updatedAt: new Date()
      }, { returning: true });
  
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ status: 'Registration Successful!', user: insertedUser });
    }
    catch(error) {
        next(error);
    }
}

const loginHandler = async (req, res, next) => {
    try {
      if(!req.session.user) {
        var authHeader = req.headers.authorization;
        
        if (!authHeader) {
          var err = new Error('You are not authenticated!');
          res.setHeader('WWW-Authenticate', 'Basic');
          err.status = 401;
          return next(err);
        }
      
        var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
        var username = auth[0];
        var password = auth[1];
      
        const user = await models.User.findOne({
          where: {
            username: username
          }
        });
  
        if (user === null) {
          var err = new Error('User ' + username + ' does not exist!');
          err.status = 403;
          throw err;
        }
        else if (user.password !== password) {
          var err = new Error('Your password is incorrect!');
          err.status = 403;
          throw err;
        }
        else if (user.username === username && user.password === password) {
          req.session.user = 'authenticated';
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('You are authenticated!')
        }
      }
      else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('You are already authenticated!');
      }
    }
    catch(error) {
      next(error);
    }
}

const logoutHandler = (req, res) => {
    if (req.session) {
      req.session.destroy();
      res.clearCookie('session-id');
      res.redirect('/');
    }
    else {
      var err = new Error('You are not logged in!');
      err.status = 403;
      next(err);
    }
}

module.exports = {
    signupHandler,
    loginHandler,
    logoutHandler
}