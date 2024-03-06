const { People } = require("../models");
// Get all people
async function getAllPeople() {
  try {
    const people = await People.findAll();
    return people;
  } catch (error) {
    throw new Error("Error retrieving people");
  }
}

// Get a person by ID
async function getPersonById(id) {
  try {
    const person = await People.findByPk(id);
    if (!person) {
      throw new Error("Person not found");
    }
    return person;
  } catch (error) {
    throw new Error("Error retrieving person: "+error);
  }
}

// Create a new person
async function createPerson(data) {
  try {
    const person = new People(data);
    await person.validate();
    await person.save();
    return person;
  } catch (error) {
    throw new Error("Error creating person");
  }
}

// Update a person by ID
async function updatePersonById(id, data) {
  try {
    const person = await People.findByPk(id);
    if (!person) {
      throw new Error("Person not found");
    }
    Object.assign(person, data);
    await person.validate();
    await person.save();
    return person;
  } catch (error) {
    throw new Error("Error updating person");
  }
}

// Delete a person by ID
async function deletePersonById(id) {
  try {
    const person = await People.findByPk(id);
    if (!person) {
      throw new Error("Person not found");
    }
    await person.destroy();
    return person;
  } catch (error) {
    throw new Error("Error deleting person: "+error);
  }
}

module.exports = {
  getAllPeople,
  getPersonById,
  createPerson,
  updatePersonById,
  deletePersonById,
};
