const express = require('express');
const router = express.Router();
const RoleService = require('../services/RoleService');
const {ValRequestRole} = require("../validations/validationRequest");


router.get("/", async (req, res) => {
    try {
      res.send("Hola Role");
    } catch (error) {
      res.status(500).json({ error: "Internal Server Errorssss" });
    }
  });
  
// Get all roles
router.get('/roles', async (req, res) => {
  try {
    const roles = await RoleService.getAllRoles();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get role by ID
router.get('/roles/:id', async (req, res) => {
  try {
    const roleId = req.params.id;
    const role = await RoleService.getRoleById(roleId);
    if (role) {
      res.json(role);
    } else {
      res.status(404).json({ error: 'Role not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new role
router.post('/roles', async (req, res) => {
  try {
    const value = await ValRequestRole(req, res);
    if (!value) {
      return;
    }
    const newRole = await RoleService.createRole(req.body);
    res.status(201).json(newRole);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update role by ID
router.put('/roles/:id', async (req, res) => {
  try {
    const roleId = req.params.id;
    const { name, description } = req.body;
    const updatedRole = await RoleService.updateRole(roleId, name, description);
    if (updatedRole) {
      res.json(updatedRole);
    } else {
      res.status(404).json({ error: 'Role not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete role by ID
router.delete('/roles/:id', async (req, res) => {
  try {
    const roleId = req.params.id;
    const deletedRole = await RoleService.deleteRole(roleId);
    if (deletedRole) {
      res.json({ message: 'Role deleted successfully' });
    } else {
      res.status(404).json({ error: 'Role not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
