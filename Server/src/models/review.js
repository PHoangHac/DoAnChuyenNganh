"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, { foreignKey: "idUser" });
      Review.belongsTo(models.TourInfo, { foreignKey: "idTourInfo" });
    }
  }
  Review.init(
    {
      Comment: DataTypes.STRING,
      Rating: DataTypes.FLOAT,
      Status: DataTypes.BOOLEAN,
      idUser: DataTypes.INTEGER,
      idTourInfo: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
