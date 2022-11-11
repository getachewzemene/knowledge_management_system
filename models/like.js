"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
        as: "likeUser",
      });
      this.belongsTo(models.Post, {
        foreignKey: "postId",
        as: "LikePost",
      });
    }
  }
  Like.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
    },

    {
      sequelize,
      tableName: "user",
      freezeTableName: true,
    }
  );
  return Like;
};
