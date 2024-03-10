const express = require('express');
const router = express.Router();
const UsersService = require('../services/UserService');
const UsersController = require('../controllers/UsersController')

router.get('/', async (req, res) => {
    try {
        res.json({ message: 'Hello from users' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new user
router.post('/users', async (req, res) => {
    try {
      await UsersController.Create(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        await UsersController.GetAll(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a specific user by ID
router.get('/users/:id', async (req, res) => {
    try {
        await UsersController.GetById(req, res)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
 

// Update a user by ID
router.put('/users/:id', async(req, res) => {
  try {
    await UsersController.Update(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error: '+error });
  }
});

// Delete a user by ID
router.delete('/users/:id', async(req, res) => {
 try {
  await UsersController.Delete(req, res)
 } catch (error) {
  res.status(500).json({ error: 'Internal server error' });
 }
});

module.exports = router;
