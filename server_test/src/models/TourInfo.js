"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TourInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TourInfo.belongsTo(models.TypeOfTransport, {
        foreignKey: "idTypesOfTransport",
      });
      // TourInfo.belongsTo(models.Recommend, { foreignKey: "idRecommend" });
      TourInfo.hasMany(models.Booking, { foreignKey: "idTourInfo" });
      TourInfo.belongsTo(models.Hotel, { foreignKey: "idHotel" });
      TourInfo.belongsTo(models.Location, { foreignKey: "idLocation" });
    }
  }
  TourInfo.init(
    {
      NameTour: DataTypes.STRING,
      abbreviation: DataTypes.STRING, // Viết tắt
      totalTime: DataTypes.STRING, // Tổng thời gian
      Departureday: DataTypes.DATE, // Thời gian khởi hành
      Description: DataTypes.TEXT,
      PricePerson: DataTypes.INTEGER,
      images: DataTypes.JSON,
      // images: DataTypes.STRING,
      idTypesOfTransport: DataTypes.INTEGER,
      idHotel: DataTypes.INTEGER,
      idLocation: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TourInfo",
    }
  );
  return TourInfo;
};
