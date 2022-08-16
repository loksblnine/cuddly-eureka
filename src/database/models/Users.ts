/**
 * Users.ts
 * */

import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../config/config";

export interface IUser {
  id?: number,
  role: number,
  email: string,
  password: string
}

export type IUserInput = Optional<IUser, 'role' & 'email' & 'password'>
export type IUserOutput = Required<IUser>

export class User extends Model<IUser, IUserInput> implements IUser {
  public id!: number;
  public role!: number;
  public email!: string;
  public password!: string;
}

User.init({
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
