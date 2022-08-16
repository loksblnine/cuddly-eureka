/**
 * Roles.ts
 * */

import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../config/config";

export interface IRole {
  id?: number,
  description: string,
}

export type IRoleInput = Optional<IRole, 'description'>
export type IRoleOutput = Required<IRole>

export class Role extends Model<IRole, IRoleInput> implements IRole {
  public id!: number
  public description!: string
}

Role.init({
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
