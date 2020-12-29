const Sequelize = require("sequelize");
const db = require("../../database/db_conn");

const kids_options = db.define("kids_options", {
  option: {
    type: Sequelize.STRING,
  },
});

module.exports = kids_options;
