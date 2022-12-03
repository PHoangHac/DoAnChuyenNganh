"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.changeColumn("TypeOfTransports", "imageTransport", {
      //   type: Sequelize.BLOB,
      //   allowNull: true,
      // }),
      queryInterface.addColumn("TourInfos", "Favorite", Sequelize.BOOLEAN),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("TourInfos", "Favorite", Sequelize.BOOLEAN),
    ]);
  },
};
