import { Options } from 'sequelize';

export const dbConfig: Options = {
  dialect: 'mysql',

  host: 'localhost',
  username: 'root',
  password: 'root',
  database: 'gsafra_mobile',

  // host: 'br274.hostgator.com.br',
  // username: 'coyot904_mobile',
  // password: 'A@cessocli3nte8',
  // database: 'coyot904_mobile',

  // host: 'br274.hostgator.com.br',
  // username: 'coyot904_mobile',
  // password: 'A@cessocli3nte8',
  // database: 'coyot904_mobile_testes',

  timezone: '-03:00',
  define: {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  },
  logging: false,
};
