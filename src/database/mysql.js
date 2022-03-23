const Sequelize = require("sequelize");
const debug = require("debug")("app");

const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
const MYSQL_USERNAME = process.env.MYSQL_USERNAME;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const MYSQL_PORT = process.env.MYSQL_PORT;
const MYSQL_HOSTNAME = process.env.MYSQL_HOSTNAME;
const MYSQL_DIALECT = process.env.MYSQL_DIALECT;

const sequelize = new Sequelize(
  MYSQL_DATABASE,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  {
    host: MYSQL_HOSTNAME,
    dialect: MYSQL_DIALECT,
    port: MYSQL_PORT
  }
);

const mysqlConnection = async () => {
  try {

    await sequelize.authenticate();
    debug('Connected successfully');
    
  } catch (error) {
      debug(error.message);
  }
};

module.exports = {mysqlConnection, sequelize};
