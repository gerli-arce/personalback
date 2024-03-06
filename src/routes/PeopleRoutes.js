const express = require("express");
const router = express.Router();
const PeopleController = require("../controllers/PeopleController");

// GET /people

router.get("/", async (req, res) => {
  try {
    res.send("Hola people");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/people", async (req, res) => {
  try {
    await PeopleController.GetAll(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error: "+error });
  }
});

// GET /people/:id
router.get("/people/:id", async (req, res) => {
  try {
    await PeopleController.GetById(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /people
router.post("/people", async (req, res) => {
  try {
    await PeopleController.Create(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT /people/:id
router.put("/people/:id", async (req, res) => {
  try {
    await PeopleController.Update(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /people/:id
router.delete("/people/:id", async (req, res) => {
  try {
    await PeopleController.Delete(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
