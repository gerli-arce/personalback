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
      allowNull: false,
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    permissions:{
        type: DataTypes.JSON,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING(320),
        allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
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
