const { DataTypes } = require("sequelize");
const sequelize = require('../db/conection.js').sequelize();

const Employe = sequelize.define(
  "employe",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
    lastname: {
      type: DataTypes.STRING(50),
    },
    age: {
      type: DataTypes.INTEGER(12),
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Employe;
