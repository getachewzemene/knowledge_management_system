"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {}
  Event.init(
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
      eventDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      filePath: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },

    {
      sequelize,
      tableName: "event",
      freezeTableName: true,
    }
  );
  return Event;
};
