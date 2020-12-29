const Sequelize = require("sequelize");
const config = require("../config/config.json");

module.exports = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    logging: false,
    host: config.development.host,
    dialect: config.development.dialect,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);
