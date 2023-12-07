import { Options } from 'sequelize';

const host = process.env.DB_HOST || 'localhost';
const port = Number(process.env.DB_PORT || 3306);
const username = process.env.DB_USERNAME || 'root';
const password = process.env.DB_PASSWORD || 'root';
const database = process.env.DB_SCHEMA || 'gsafra_mobile';

export const dbConfig: Options = {
  dialect: 'mysql',
  host,
  username,
  password,
  database,
  port,
  timezone: '-03:00',
  define: {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  },
  logging: false,
};
