"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TargetGroup extends Model {
    static associate(models) {
      this.belongsTo(models.Post, {
        foreignKey: "postId",
        as: "targetGroupPost",
      });
    }
  }
  TargetGroup.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      department: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },

    {
      sequelize,
      tableName: "target_group",
      freezeTableName: true,
    }
  );
  return TargetGroup;
};
