"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hotel.hasMany(models.TourInfo, { foreignKey: "idHotel" });
    }
  }
  Hotel.init(
    {
      NameHotel: DataTypes.STRING,
      images: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "Hotel",
    }
  );
  return Hotel;
};
