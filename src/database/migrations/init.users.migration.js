'use strict';
const {DataTypes} = require("sequelize");
const {sequelize} = require("../config/config");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('roles', {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        role: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        email: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        password: {
          type: DataTypes.TEXT,
          allowNull: false
        }
      },
      {
        sequelize,
        tableName: 'users',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: "users_pk",
            unique: true,
            fields: [
              {name: "id"},
            ]
          },
          {
            name: "users_id_uindex",
            unique: true,
            fields: [
              {name: "id"},
            ]
          },
        ]
      });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('roles');
  }
};