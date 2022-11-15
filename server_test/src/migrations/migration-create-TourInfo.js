"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TourInfos", {
      // NameTour: DataTypes.STRING,
      // abbreviation: DataTypes.STRING, // Viết tắt
      // location: DataTypes.STRING,
      // totalTime: DataTypes.STRING, // Tổng thời gian
      // Departureday: DataTypes.RANGE(DataTypes.DATE), // Thời gian khởi hành
      // Description: DataTypes.TEXT,
      // PricePerson: DataTypes.INTEGER,
      // idTypesOfTransport: DataTypes.INTEGER,
      // idHotel: DataTypes.INTEGER,

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // TEN TOUR
      NameTour: {
        type: Sequelize.STRING,
      },
      // VIET TAT TEN TOUR
      abbreviation: {
        type: Sequelize.STRING,
      },

      // TONG THOI GIAN
      totalTime: {
        type: Sequelize.STRING,
      },
      // NGAY KHOI HANH
      Departureday: {
        type: Sequelize.DATE,
      },
      // MO TA
      Description: {
        type: Sequelize.TEXT,
      },
      // GIA TIEN / NGUOI
      PricePerson: {
        type: Sequelize.INTEGER,
      },
      images: {
        // type: Sequelize.JSON,
        type: Sequelize.JSON,
        allowNull: false,
        get() {
          return this.getDataValue("images").split(";");
        },
        set(val) {
          this.setDataValue("images", val.join(";"));
        },
      },
      idTypesOfTransport: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      idHotel: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      idLocation: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      idReview: {
        allowNull: false,
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
    await queryInterface.dropTable("TourInfos");
  },
};
