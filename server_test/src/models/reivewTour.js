"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ReviewTour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Review.hasMany(models.TourInfo, { foreignKey: 'idReview' })
    }
  }
  ReviewTour.init(
    {
      //   idReview: {
      //     type: DataTypes.INTEGER,
      //     references: {
      //       model: "Review",
      //       key: "idReview",
      //     },
      //   },
      //   idTourInfo: {
      //     type: DataTypes.INTEGER,
      //     references: {
      //       model: "TourInfo",
      //       key: "idTourInfo",
      //     },
      //   },
      Status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "ReviewTour",
    }
  );
  return ReviewTour;
};
