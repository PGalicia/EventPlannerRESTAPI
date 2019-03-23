const Sequelize = require('sequelize');

module.exports = new Sequelize({
  dialect: 'sqlite',
  storage: '_database/eventplanner.db',
  operatorsAliases: false
});
