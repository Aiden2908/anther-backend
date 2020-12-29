const Sequelize = require("sequelize");
const db = require("../../database/db_conn");

const goal_options = db.define("goal_options", {
  option: {
    type: Sequelize.STRING,
  },
});

module.exports = goal_options;
