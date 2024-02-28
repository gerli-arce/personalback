const express = require("express");
const router = express.Router();
const {
  createBranch,
  getAllBranch,
  getBranchById,
  updateBranch,
  deleteBranch,
} = require("../services/BranchService");

const { messages, branchSchema } = require("../validations/ValidationModels");

router.get("/", async (req, res) => {
  try {
    res.send("Hola mundo");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Errorssss" });
  }
});

router.get("/branches", async (req, res) => {
  try {
    const branches = await getAllBranch();
    res.json(branches);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /branches/:id
router.get("/branches/:id", async (req, res) => {
  const branchId = req.params.id;
  try {
    const branch = await getBranchById(branchId);
    if (branch) {
      res.json(branch);
    } else {
      res.status(404).json({ error: "Branch not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /branches
router.post("/branches", async (req, res) => {
  const { error, value } = branchSchema.validate(req.body, {
    abortEarly: false,
    messages: messages,
  });

  if (error) {
    const errors = error.details.map((detail) =>
      detail.message.replace(/"/g, "")
    );
    res.status(400).json({ error: errors });
    return;
  }

  try {
    const newBranch = await createBranch(value);
    res.status(201).json(newBranch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT /branches/:id
router.put("/branches/:id", async (req, res) => {
  const branchId = req.params.id;
  const branchData = req.body;
  try {
    const updatedBranch = await updateBranch(branchId, branchData);
    if (updatedBranch) {
      res.json(updatedBranch);
    } else {
      res.status(404).json({ error: "Branch not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /branches/:id
router.delete("/branches/:id", async (req, res) => {
  const branchId = req.params.id;
  try {
    const deletedBranch = await deleteBranch(branchId);
    if (deletedBranch) {
      res.json({ message: "Branch deleted successfully" });
    } else {
      res.status(404).json({ error: "Branch not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
