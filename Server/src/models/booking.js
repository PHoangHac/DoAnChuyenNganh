'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, { foreignKey: 'idUser' })
      Booking.belongsTo(models.TourInfo, { foreignKey: 'idTourInfo' })
      // Booking.hasOne(models.TypeOfTransport, { foreignKey: 'id' })
      // Booking.hasOne(models.Recommend, { foreignKey: 'id' })
    }
  }
  Booking.init({
    idUser: DataTypes.STRING,
    Adult: DataTypes.INTEGER,
    Children: DataTypes.INTEGER,
    Status: DataTypes.BOOLEAN,
    idTourInfo: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};