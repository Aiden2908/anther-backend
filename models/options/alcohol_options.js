const Sequelize = require("sequelize");
const db = require("../../database/db_conn");

const alcohol_options = db.define("alcohol_options", {
  option: {
    type: Sequelize.STRING,
  },
});

module.exports = alcohol_options;
