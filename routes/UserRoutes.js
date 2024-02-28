const express = require('express');
const router = express.Router();
const UsersService = require('../services/UserService');

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
        const newUser = req.body;
        const createdUser = await UsersService.createUser(newUser);
        res.json(createdUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await UsersService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a specific user by ID
router.get('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await UsersService.getUserById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
 

// Update a user by ID
router.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  const result = UsersService.updateUser(userId, updatedUser);
  if (result) {
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Delete a user by ID
router.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  const result = UsersService.deleteUser(userId);
  if (result) {
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

module.exports = router;
