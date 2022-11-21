"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CantReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CantReview.belongsTo(models.User, { foreignKey: "idUser" });
      CantReview.belongsTo(models.TourInfo, { foreignKey: "idTourInfo" });
    }
  }
  CantReview.init(
    {
      Status: DataTypes.BOOLEAN,
      idUser: DataTypes.INTEGER,
      idTourInfo: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CantReview",
    }
  );
  return CantReview;
};
