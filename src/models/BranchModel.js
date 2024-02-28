const { DataTypes } = require("sequelize");
const sequelize = require("../config/db/conection.js").sequelize();

const Branch = sequelize.define(
  "branches",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    correlative: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ubigeo: {
      type: DataTypes.STRING(320),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(50),
    },
    description: {
      type: DataTypes.STRING(50),
    },
    color: {
      type: DataTypes.STRING(26),
    },
    status: {
      type: DataTypes.BOOLEAN(1),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Branch.sync({ alter: true })
  .then(() => {
    console.log("Tabla Branch creada con éxito");
  })
  .catch((err) => {
    console.error("Error al crear la tabla Branch: " + err);
  });

module.exports = Branch;
