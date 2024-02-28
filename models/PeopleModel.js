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
    allowNull: false,
  },
  document_number: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  relative_id: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING(1),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(320),
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING(16),
    allowNull: false,
  },
  _branch: {
    type: DataTypes.INTEGER,
    references: {
      model: Branch,
      key: "id",
    },
    allowNull: false,
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
