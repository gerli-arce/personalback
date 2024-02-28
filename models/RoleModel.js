const { DataTypes } = require("sequelize");
const sequelize = require("../assets/db/conection.js").sequelize();

const Role = sequelize.define(
  "roles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: DataTypes.STRING(50),
    },
    priority: {
      type: DataTypes.INTEGER,
    },
    permissions:{
        type: DataTypes.JSON,
    },
    description:{
        type: DataTypes.STRING(320),
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: false,
  }
);

Role.sync({ alter: true })
  .then(() => {
    console.log("Tabla role creada con éxito");
  })
  .catch((err) => {
    console.error("Error al crear la tabla role: " + err);
  });

module.exports = Role;
