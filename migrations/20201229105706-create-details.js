"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("details", {
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("details");
  },
};
