const User = require("./UserModel");
const Branch = require("./BranchModel");
const People = require("./PeopleModel");
const Role = require("./RoleModel");


// User.belongsTo(Branch, { foreignKey: "_branch" });
// User.belongsTo(Role, { foreignKey: "_role" });
// People.belongsTo(Branch, { foreignKey: "_branch" });
// People.belongsTo(User, { foreignKey: "_creation_user" });
// People.belongsTo(User, { foreignKey: "_update_user" });


module.exports = {
    User,
    Branch,
    People,
    Role,
};
