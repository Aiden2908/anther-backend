const Sequelize = require("sequelize");
const db = require("../../database/db_conn");

const smoke_options = db.define("smoke_options", {
  option: {
    type: Sequelize.STRING,
  },
});

module.exports = smoke_options;
