"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bookings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Adult: {
        type: Sequelize.INTEGER,
      },
      Children: {
        type: Sequelize.INTEGER,
      },
      Status: {
        type: Sequelize.BOOLEAN,
      },
      StartedDay: {
        type: Sequelize.STRING,
      },
      idUser: {
        type: Sequelize.INTEGER,
      },
      idTourInfo: {
        type: Sequelize.INTEGER,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Bookings");
  },
};
