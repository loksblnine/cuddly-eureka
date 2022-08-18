'use strict';
import {User} from "../models";

const {DataTypes} = require("sequelize");
const {sequelize} = require("../config/config");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('userToUser', {
      bossId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: 'id'
        }
      },
      regularId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: User,
          key: 'id'
        }
      }
    },
      {
        sequelize,
        tableName: 'userToUser',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: "userToUser_bossId_regularId_uindex",
            unique: true,
            fields: [
              {name: "bossId"},
              {name: "regularId"},
            ]
          },
        ]
      })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('roles');
  }
};