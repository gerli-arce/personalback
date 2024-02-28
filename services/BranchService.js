const { Branch } = require('../models'); // Assuming you have a 'Branch' model defined


// Create a new branch
async function createBranch(branchData) {
  try {
    const branch = await Branch.create(branchData);
    return branch;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to create branch');
  }
}

// Get all branch
async function getAllBranch() {
  try {
    const branch = await Branch.findAll();
    return branch;
  } catch (error) {
    throw new Error('Failed to get branch');
  }
}

// Get a branch by ID
async function getBranchById(branchId) {
  try {
    const branch = await Branch.findByPk(branchId);
    return branch;
  } catch (error) {
    throw new Error('Failed to get branch');
  }
}

// Update a branch
async function updateBranch(branchId, branchData) {
  try {
    const branch = await Branch.findByPk(branchId);
    if (!branch) {
      throw new Error('Branch not found');
    }
    await branch.update(branchData);
    return branch;
  } catch (error) {
    throw new Error('Failed to update branch');
  }
}

// Delete a branch
async function deleteBranch(branchId) {
  try {
    const branch = await Branch.findByPk(branchId);
    if (!branch) {
      throw new Error('Branch not found');
    }
    await branch.destroy();
    return branch;
  } catch (error) {
    throw new Error('Failed to delete branch');
  }
}

module.exports = {
  createBranch,
  getAllBranch,
  getBranchById,
  updateBranch,
  deleteBranch,
};
