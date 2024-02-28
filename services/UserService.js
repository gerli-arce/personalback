const { User } = require("../models");

async function getAllUsers() {
  try {
    const users = await User.findAll(); // Retrieve all users from the database
    return users;
  } catch (error) {
    console.error("Error retrieving users:", error);
    throw error;
  }
}

async function getUserById(id) {
  try {
    const user = await User.findByPk(id); // Find a user by its ID
    return user;
  } catch (error) {
    console.error(`Error retrieving user with ID ${id}:`, error);
    throw error;
  }
}

async function createUser(userData) {
  try {
    const user = await User.create(userData); // Create a new user in the database
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

async function updateUser(id, userData) {
  try {
    const user = await User.findByPk(id); // Find the user to update
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    await user.update(userData); // Update the user's data
    return user;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
}

async function deleteUser(id) {
  try {
    const user = await User.findByPk(id); // Find the user to delete
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    await user.destroy(); // Delete the user from the database
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw error;
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
