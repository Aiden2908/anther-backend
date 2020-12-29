const Sequelize = require("sequelize");
const db = require("../../database/db_conn");

const sexual_orientation_options = db.define("sexual_orientation_options", {
  option: {
    type: Sequelize.STRING,
  },
});

module.exports = sexual_orientation_options;
