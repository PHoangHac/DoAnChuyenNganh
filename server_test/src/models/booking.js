"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, { foreignKey: "idUser" });
      Booking.belongsTo(models.TourInfo, { foreignKey: "idTourInfo" });
      Booking.hasOne(models.Bill, { foreignKey: "idBooking" });
      // Booking.hasOne(models.TypeOfTransport, { foreignKey: 'id' })
    }
  }
  Booking.init(
    {
      Adult: DataTypes.INTEGER,
      Children: DataTypes.INTEGER,
      Status: DataTypes.BOOLEAN,
      AdultTotalCost: DataTypes.INTEGER,
      ChildrenTotalCost: DataTypes.INTEGER,
      totalCost: DataTypes.INTEGER,
      totalGuest: DataTypes.INTEGER,
      StartedDay: DataTypes.STRING,
      idUser: DataTypes.INTEGER,
      idTourInfo: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
