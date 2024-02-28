const express = require("express");
const router = express.Router();
const {
  createBranch,
  getAllBranch,
  getBranchById,
  updateBranch,
  deleteBranch,
} = require("../services/BranchService");

const BranchController = require("../controllers/BranchController");


router.get("/", async (req, res) => {
  try {
    res.send("Hola branch");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Errorssss" });
  }
});

// GET /branches
router.get("/branches", async (req, res) => {
  try {
    console.log(req.body)
    await BranchController.GetAll(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error: "+error });
  }
});

// GET /branches/:id
router.get("/branches/:id", async (req, res) => {
  try {
    await BranchController.GetById(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /branches
router.post("/branches", async (req, res) => {
  try {
    await BranchController.Create(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT /branches/:id
router.put("/branches/:id", async (req, res) => {
  try {
    await BranchController.Update(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /branches/:id
router.delete("/branches/:id", async (req, res) => {
  try {
    await BranchController.Delete(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
