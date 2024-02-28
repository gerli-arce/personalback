const { DataTypes } = require("sequelize");
const sequelize = require("../assets/db/conection.js").sequelize();

const People = require("./PeopleModel.js");
const Role = require("./RoleModel.js");
const Branch = require("./BranchModel.js");

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
    type: DataTypes.STRING(120),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  relative_id: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  auth_token: {
    type: DataTypes.STRING(64),
    allowNull:true,
  },
  _person: {
    type: DataTypes.INTEGER,
    references: {
      model: People,
      key: "id",
    },
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
  image_type: {
    type: DataTypes.STRING(26),
    allowNull: true,
  },
  image_full: {
    type: DataTypes.BLOB("long"),
    allowNull: true,
  },
  image_mini: {
    type: DataTypes.BLOB("medium"),
    allowNull: true,
  },
  origin: {
    type: DataTypes.STRING(60),
    allowNull: true,
  },
  _role: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: "id",
    },
    allowNull: false,
  },
  creation_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  _creation_user: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  update_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  _update_user: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

// Relacionar el modelo User con el modelo Branches
User.belongsTo(Branch, {
  foreignKey: "_branch",
  targetKey: "id",
});

// Relacionar el modelo User con el modelo Role
User.belongsTo(Role, {
  foreignKey: "_role",
  targetKey: "id",
});

// Relacionar el modelo User con el modelo Peoples
User.belongsTo(People, {
  foreignKey: "_person",
  targetKey: "id",
});


// Ahora que User está definido, podemos agregar las referencias
User._creation_user = {
  type: DataTypes.INTEGER,
  references: {
    model: User,
    key: "id",
  },
};

User._update_user = {
  type: DataTypes.INTEGER,
  references: {
    model: User,
    key: "id",
  },
};

// Ahora puedes establecer las relaciones
User.belongsTo(User, {
  foreignKey: "_creation_user",
  targetKey: "id",
});

User.belongsTo(User, {
  foreignKey: "_update_user",
  targetKey: "id",
});

// Sincronizar el modelo con la base de datos
User.sync({ alter : true})
  .then(() => {
    console.log("Tabla users creada con éxito");
  })
  .catch((err) => {
    console.error("Error al crear la tabla users: " + err);
  });

module.exports = User;
