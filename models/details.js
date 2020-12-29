const Sequelize = require("sequelize");
const db = require("../database/db_conn");

const User = db.define("details", {
  user_id: {
    allowNull: false,
    autoIncrement: true,
    type: Sequelize.INTEGER,
  },
  goal: {
    type: Sequelize.DATE,
  },
  dob: {
    type: Sequelize.DATE,
  },
  sexual_orientaion: {
    type: Sequelize.STRING,
  },
  statement: {
    type: Sequelize.STRING,
  },
  education: {
    type: Sequelize.STRING,
  },
  work: {
    type: Sequelize.STRING,
  },
  height: {
    type: Sequelize.DECIMAL,
  },
  alcohol: {
    type: Sequelize.STRING,
  },
  smoke: {
    type: Sequelize.STRING,
  },
  kids: {
    type: Sequelize.STRING,
  },
});

module.exports = User;
