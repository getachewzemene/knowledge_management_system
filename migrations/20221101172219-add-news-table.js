"use strict";
const { DataTypes } = require("sequelize");
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(
      "news",
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
        updatedAt: DataTypes.DATE,
        createdAt: DataTypes.DATE,
      },
      {
        hooks: {
          beforeCreate: function (event, options, fn) {
            event.createdAt = new Date();
            event.updatedAt = new Date();
            fn(null, event);
          },
          beforeUpdate: function (event, options, fn) {
            event.updatedAt = new Date();
            fn(null, event);
          },
        },
      },
      {
        freezeTableName: true,
        timestamps: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("news");
  },
};
