"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bill.belongsTo(models.User, { foreignKey: "idUser" });
      Bill.belongsTo(models.Booking, { foreignKey: "idBooking" });
      // Booking.hasOne(models.TypeOfTransport, { foreignKey: 'id' })
    }
  }
  Bill.init(
    {
      DatePayment: DataTypes.STRING,
      TimePayment: DataTypes.STRING,
      codeGenerate: DataTypes.STRING,
      Status: DataTypes.BOOLEAN,
      idUser: DataTypes.INTEGER, //????????????
      idBooking: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Bill",
    }
  );
  return Bill;
};
