const express = require("express");
const router = express.Router();
const peopleService = require("../services/PeopleService");
const { ValRequestPerson } = require("../validations/validationRequest");

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
    const people = await peopleService.getAllPeople();
    res.json(people);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /people/:id
router.get("/people/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const person = await peopleService.getPersonById(id);
    if (person) {
      res.json(person);
    } else {
      res.status(404).json({ error: "Person not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /people
router.post("/people", async (req, res) => {
  try {
    const value = await ValRequestPerson(req, res);
    if (!value) {
      return;
    }
    const newPerson = await peopleService.createPerson(value);
    res.status(201).json(newPerson);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT /people/:id
router.put("/people/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  try {
    const updatedPerson = await peopleService.updatePersonById(id, name, age);
    if (updatedPerson) {
      res.json(updatedPerson);
    } else {
      res.status(404).json({ error: "Person not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /people/:id
router.delete("/people/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPerson = await peopleService.deletePersonById(id);
    if (deletedPerson) {
      res.json(deletedPerson);
    } else {
      res.status(404).json({ error: "Person not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
