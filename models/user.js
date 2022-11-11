"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Post, { foreignKey: "postedBy", as: "userPost" });
      this.hasMany(models.Post, {
        foreignKey: "verifiedBy",
        as: "userPostVerify",
      });
      this.hasMany(models.Like, {
        foreignKey: "userId",
        as: "userLike",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      DOB: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      employeeNatureId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pensionNumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      retirementDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isTerminated: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      salary: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      department: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "employee",
        allowNull: false,
      },
    },

    {
      sequelize,
      tableName: "user",
      freezeTableName: true,
    }
  );
  return User;
};
