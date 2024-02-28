const { DataTypes } = require("sequelize");
const sequelize = require("../assets/db/conection.js").sequelize();

const Branch = require("./BranchModel.js");

const People = sequelize.define("peoples", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  document_type: {
    type: DataTypes.STRING(50),
  },
  document_number: {
    type: DataTypes.STRING(50),
  },
  relative_id: {
    type: DataTypes.STRING(30),
  },
  name: {
    type: DataTypes.STRING(100),
  },
  lastname: {
    type: DataTypes.STRING(100),
  },
  birthdate: {
    type: DataTypes.DATE,
  },
  gender: {
    type: DataTypes.STRING(1),
  },
  email: {
    type: DataTypes.STRING(320),
  },
  phone: {
    type: DataTypes.STRING(20),
  },
  address: {
    type: DataTypes.STRING(100),
  },
  type: {
    type: DataTypes.STRING(16),
  },
  _branch: {
    type: DataTypes.INTEGER,
    references: {
      model: Branch,
      key: "id",
    },
  },
});

People.belongsTo(Branch, {
  foreignKey: "_branch",
  targetKey: "id",
});

People.sync({ alter: true })
  .then(() => {
    console.log("Tabla people creada con éxito");
  })
  .catch((err) => {
    console.error("Error al crear la tabla people: " + err);
  });

module.exports = People;
