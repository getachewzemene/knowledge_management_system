"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      this.hasMany(models.TargetGroup, {
        foreignKey: "postId",
        as: "postTargetGroup",
      });
      this.hasMany(models.Comment, {
        foreignKey: "postId",
        as: "postComment",
      });
      this.hasMany(models.Like, {
        foreignKey: "postId",
        as: "postLike",
      });
      this.belongsTo(models.User, { foreignKey: "postedBy", as: "postUser" });
      this.belongsTo(models.User, {
        foreignKey: "verifiedBy",
        as: "postVerifyUser",
      });
    }
  }
  Post.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
        allowNull: true,
      },
      filePath: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },

    {
      sequelize,
      tableName: "post",
      freezeTableName: true,
    }
  );
  return Post;
};
