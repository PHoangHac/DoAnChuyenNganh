"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.changeColumn("TypeOfTransports", "imageTransport", {
      //   type: Sequelize.BLOB,
      //   allowNull: true,
      // }),
      queryInterface.addColumn("Bookings", "totalCost", Sequelize.INTEGER),
      queryInterface.addColumn("Bookings", "totalGuest", Sequelize.INTEGER),
      queryInterface.addColumn("Bookings", "AdultTotalCost", Sequelize.INTEGER),
      queryInterface.addColumn(
        "Bookings",
        "ChildrenTotalCost",
        Sequelize.INTEGER
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Bookings", "totalCost", Sequelize.INTEGER),
      queryInterface.addColumn("Bookings", "totalGuest", Sequelize.INTEGER),
      queryInterface.addColumn("Bookings", "AdultTotalCost", Sequelize.INTEGER),
      queryInterface.addColumn(
        "Bookings",
        "ChildrenTotalCost",
        Sequelize.INTEGER
      ),
    ]);
  },
};
