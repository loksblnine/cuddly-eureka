/**
 * UserToUser.ts
 * */

import {DataTypes, Model} from "sequelize";
import {sequelize} from "../config/config";
import {User} from "./Users";

export interface IUserToUser {
  bossId: number,
  regularId: number,
}

export type IUserInput = Required<IUserToUser>
export type IUserOutput = Required<IUserToUser>

export class UserToUser extends Model<IUserToUser, IUserInput> implements IUserToUser {
  public bossId!: number;
  public regularId!: number;
}

UserToUser.init({
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
  });
