"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bills", {
      // TimePayment: DataTypes.RANGE(DataTypes.DATE),
      // codeGenerate: DataTypes.STRING,
      // Status: DataTypes.BOOLEAN,
      // idUser: DataTypes.INTEGER,
      // idBooking: DataTypes.INTEGER,
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      DatePayment: {
        type: Sequelize.STRING,
      },
      TimePayment: {
        type: Sequelize.STRING,
      },
      codeGenerate: {
        type: Sequelize.STRING,
      },
      Status: {
        type: Sequelize.BOOLEAN,
      },
      idUser: {
        type: Sequelize.INTEGER,
      },
      idBooking: {
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
    await queryInterface.dropTable("Bills");
  },
};
