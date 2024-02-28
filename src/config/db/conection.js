const mysql = require("mysql");
const Sequelize = require("sequelize");
const config = require("./config.js").config;

const conection = () => {
  return mysql.createConnection(config);
};

const sequelize = () => {
  return new Sequelize("system", "root", "", {
    host: "localhost",
    dialect: "mysql",
  });
};

module.exports.sequelize = sequelize; // Cambiar esta línea
module.exports.conection = conection;
