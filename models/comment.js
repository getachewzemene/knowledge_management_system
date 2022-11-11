"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
        as: "commentUser",
      });
      this.belongsTo(models.Post, {
        foreignKey: "postId",
        as: "commentPost",
      });
    }
  }
  Comment.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },

    {
      sequelize,
      tableName: "comment",
      freezeTableName: true,
    }
  );
  return Comment;
};
