const { DataTypes } = require("sequelize");
const sequelize = require("../db/conection.js").sequelize();

// Crear el modelo User con sequelize.define
const User = sequelize.define("user", {
  // Definir los atributos del modelo según las columnas de la tabla
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("admin", "user"),
    defaultValue: "user",
  },
});

// Sincronizar el modelo con la base de datos
User.sync({ force: true })
  .then(() => {
    console.log("Tabla users creada con éxito");
  })
  .catch((err) => {
    console.error("Error al crear la tabla users: " + err);
  });


module.exports = User;