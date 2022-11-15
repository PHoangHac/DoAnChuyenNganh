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
      // Review.hasMany(models.TourInfo, { foreignKey: 'idReview' })
      Review.belongsTo(models.User, { foreignKey: "idUser" });
      // Review.belongsToMany(models.TourInfo, { through: ReviewTour });
      Review.belongsToMany(
        models.TourInfo,
        { through: "ReviewTour" },
        { foreignKey: "idReview" }
      );
    }
  }
  Review.init(
    {
      comment: DataTypes.STRING,
      rating: DataTypes.FLOAT,
      // Status: DataTypes.BOOLEAN,
      idUser: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
