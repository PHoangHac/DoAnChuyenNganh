"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Booking, { foreignKey: "idUser" });
      User.hasMany(models.Bill, { foreignKey: "idUser" });
      User.hasMany(models.Review, { foreignKey: "idUser" });
      User.hasMany(models.CantReview, { foreignKey: "idUser" });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      image: DataTypes.STRING,
      CantReview: DataTypes.BOOLEAN,
      roleName: DataTypes.ENUM("Admin", "User"),
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
