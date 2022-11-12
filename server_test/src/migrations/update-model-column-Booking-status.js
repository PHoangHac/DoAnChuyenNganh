"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.changeColumn("TypeOfTransports", "imageTransport", {
      //   type: Sequelize.BLOB,
      //   allowNull: true,
      // }),
      queryInterface.changeColumn(
        "Bookings",
        "Status",
        Sequelize.ENUM("Default", "Online")
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        "Bookings",
        "Status",
        Sequelize.ENUM("Default", "Online")
      ),
    ]);
  },
};
