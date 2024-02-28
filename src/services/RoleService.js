const { Role } = require('../models');

// Create a new role
async function createRole(roleData) {
  try {
    const role = await Role.create(roleData);
    return role;
  } catch (error) {
    throw new Error('Failed to create role');
  }
}

// Get all roles
async function getAllRoles() {
  try {
    const roles = await Role.findAll();
    return roles;
  } catch (error) {
    throw new Error('Failed to get roles');
  }
}

// Get a role by ID
async function getRoleById(roleId) {
  try {
    const role = await Role.findByPk(roleId);
    if (!role) {
      throw new Error('Role not found');
    }
    return role;
  } catch (error) {
    throw new Error('Failed to get role');
  }
}

// Update a role
async function updateRole(roleId, roleData) {
  try {
    const role = await Role.findByPk(roleId);
    if (!role) {
      throw new Error('Role not found');
    }
    await role.update(roleData);
    return role;
  } catch (error) {
    throw new Error('Failed to update role');
  }
}

// Delete a role
async function deleteRole(roleId) {
  try {
    const role = await Role.findByPk(roleId);
    if (!role) {
      throw new Error('Rol no encontrado');
    }
    await role.destroy();
    return role;
  } catch (error) {
    throw new Error('Error al eliminar rol');
  }
}

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
