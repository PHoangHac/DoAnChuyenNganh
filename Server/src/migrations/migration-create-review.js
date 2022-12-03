"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Reviews", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Comment: {
        type: Sequelize.STRING,
      },
      Rating: {
        type: Sequelize.FLOAT,
      },
      Status: {
        type: Sequelize.BOOLEAN,
      },
      idUser: {
        type: Sequelize.INTEGER,
      },
      idTourInfo: {
        type: Sequelize.INTEGER,
      },
      ///
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Reviews");
  },
};