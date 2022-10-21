"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("TypeOfTransports", "imageTransport", {
        type: Sequelize.BLOB,
        allowNull: true,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("TypeOfTransports", "imageTransport", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },
};
