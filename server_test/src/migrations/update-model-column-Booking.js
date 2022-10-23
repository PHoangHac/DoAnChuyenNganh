// "use strict";
// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return Promise.all([
//       // queryInterface.changeColumn("TypeOfTransports", "imageTransport", {
//       //   type: Sequelize.BLOB,
//       //   allowNull: true,
//       // }),
//       queryInterface.addColumn("Bookings", "totalGuest", Sequelize.INTEGER),
//     ]);
//   },

//   down: (queryInterface, Sequelize) => {
//     return Promise.all([
//       queryInterface.addColumn("Bookings", "totalGuest", Sequelize.INTEGER),
//     ]);
//   },
// };
