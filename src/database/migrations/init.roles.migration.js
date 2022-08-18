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
        description: {
          type: DataTypes.TEXT,
          allowNull: false
        }
      },
      {
        sequelize,
        tableName: 'roles',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: "roles_pk",
            unique: true,
            fields: [
              {name: "id"},
            ]
          },
          {
            name: "roles_id_uindex",
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