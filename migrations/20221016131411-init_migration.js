"use strict";
const { DataTypes } = require("sequelize");
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    try {
      await queryInterface.createTable(
        "user",
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
            allowNull: true,
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
          updatedAt: DataTypes.DATE,
          createdAt: DataTypes.DATE,
        },
        {
          hooks: {
            beforeCreate: function (user, options, fn) {
              user.createdAt = new Date();
              user.updatedAt = new Date();
              fn(null, user);
            },
            beforeUpdate: function (user, options, fn) {
              user.updatedAt = new Date();
              fn(null, user);
            },
          },
        },
        {
          freezeTableName: true,
          timestamps: true,
          transaction,
        }
      );
      await queryInterface.createTable(
        "event",
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
          filePath: {
            type: DataTypes.STRING,
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
          transaction,
        }
      );
      await queryInterface.createTable(
        "post",
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
            allowNull: false,
          },
          filePath: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          postedBy: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
              model: "user",
              key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          verifiedBy: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
              model: "user",
              key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          updatedAt: DataTypes.DATE,
          createdAt: DataTypes.DATE,
        },
        {
          hooks: {
            beforeCreate: function (post, options, fn) {
              post.createdAt = new Date();
              post.updatedAt = new Date();
              fn(null, post);
            },
            beforeUpdate: function (post, options, fn) {
              post.updatedAt = new Date();
              fn(null, post);
            },
          },
        },
        {
          freezeTableName: true,
          timestamps: true,
          transaction,
        }
      );

      await queryInterface.createTable(
        "target_group",
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
          postId: {
            type: DataTypes.STRING,
            references: {
              model: "post",
              key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          updatedAt: DataTypes.DATE,
          createdAt: DataTypes.DATE,
        },
        {
          hooks: {
            beforeCreate: function (target_group, options, fn) {
              target_group.createdAt = new Date();
              target_group.updatedAt = new Date();
              fn(null, target_group);
            },
            beforeUpdate: function (target_group, options, fn) {
              target_group.updatedAt = new Date();
              fn(null, target_group);
            },
          },
        },
        {
          freezeTableName: true,
          timestamps: true,
          transaction,
        }
      );
      await queryInterface.createTable(
        "comment",
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
          userId: {
            type: DataTypes.STRING,
            references: {
              model: "user",
              key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          postId: {
            type: DataTypes.STRING,
            references: {
              model: "post",
              key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          updatedAt: DataTypes.DATE,
          createdAt: DataTypes.DATE,
        },
        {
          hooks: {
            beforeCreate: function (comment, options, fn) {
              comment.createdAt = new Date();
              comment.updatedAt = new Date();
              fn(null, comment);
            },
            beforeUpdate: function (comment, options, fn) {
              comment.updatedAt = new Date();
              fn(null, comment);
            },
          },
        },
        {
          freezeTableName: true,
          timestamps: true,
          transaction,
        }
      );
      await queryInterface.createTable(
        "like",
        {
          id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
          },
          userId: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
              model: "user",
              key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          postId: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
              model: "post",
              key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          updatedAt: DataTypes.DATE,
          createdAt: DataTypes.DATE,
        },
        {
          hooks: {
            beforeCreate: function (like, options, fn) {
              like.createdAt = new Date();
              like.updatedAt = new Date();
              fn(null, like);
            },
            beforeUpdate: function (like, options, fn) {
              like.updatedAt = new Date();
              fn(null, like);
            },
          },
        },
        {
          freezeTableName: true,
          transaction,
        }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("comment");
    await queryInterface.dropTable("target_group");
    await queryInterface.dropTable("like");
    await queryInterface.dropTable("event");
    await queryInterface.dropTable("post");
    await queryInterface.dropTable("user");
  },
};
