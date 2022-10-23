"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Location.hasMany(models.TourInfo, { foreignKey: "idLocation" });
    }
  }
  Location.init(
    {
      country: DataTypes.STRING,
      placeName: DataTypes.STRING, // ĐỊA DANH
      descLocation: DataTypes.STRING, // MÔ TẢ CHI TIẾT
    },
    {
      sequelize,
      modelName: "Location",
    }
  );
  return Location;
};
