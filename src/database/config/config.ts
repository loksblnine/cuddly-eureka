import {Sequelize} from "sequelize";

const db_database = String(process.env.DB_DATABASE)
const db_password = String(process.env.DB_PASSWORD)
const db_user = String(process.env.DB_USER)
const db_host = String(process.env.DB_HOST)

const dialectOptions = process.env.NODE_ENV === "development" ? {} : {
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
}

export const sequelize = new Sequelize(db_database, db_user, db_password, {
  host: db_host,
  dialect: 'postgres',
  dialectOptions
})