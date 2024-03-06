const express = require('express');
const router = express.Router();

const RoleController = require('../controllers/RoleController');

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
    await RoleController.GetAll(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get role by ID
router.get('/roles/:id', async (req, res) => {
  try {
    await RoleController.GetById(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new role
router.post('/roles', async (req, res) => {
  try {
    await RoleController.Create(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update role by ID
router.put('/roles/:id', async (req, res) => {
  try {
    await RoleController.Update(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete role by ID
router.delete('/roles/:id', async (req, res) => {
  try {
    await RoleController.Delete(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
