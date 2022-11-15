"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.changeColumn("TypeOfTransports", "imageTransport", {
      //   type: Sequelize.BLOB,
      //   allowNull: true,
      // }),
      // queryInterface.addColumn("ReviewTours", "idReview", {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: { model: "Reviews", key: "id" },
      // }),
      // queryInterface.addColumn("ReviewTours", "idTourInfo", {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: { model: "TourInfos", key: "id" },
      // }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.addColumn("ReviewTours", "idReview", {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: { model: "Reviews", key: "id" },
      // }),
      // queryInterface.addColumn("ReviewTours", "idTourInfo", {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: { model: "TourInfos", key: "id" },
      // }),
    ]);
  },
};
