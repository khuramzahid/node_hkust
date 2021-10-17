const { Sequelize, sequelize } = require('../sequelize');

const User = sequelize.define('User', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

module.exports = User;