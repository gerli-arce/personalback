const express = require("express");
const cors = require("cors");

const Employe = require("./assets/models/employe.js");
const User = require("./assets/models/user.js");

var app = express();

app.use(cors());

app.use(express.json());

app.get("/employees", async function (req, res) {
  try {
    const employees = await Employe.findAll();
    res.json(employees);
  } catch (err) {
    res.status(500).send("Error al consultar la base de datos");
  }
});

app.get("/users/create", async function (req, res) {
  try {
    const users = await User.findAll();
    res.json(users); 
  } catch (err) {
    res.status(500).send("Error al consultar la base de datos");
  }
});

app.get("/", function (req, res) {
  res.send("Hola mundo");
});

app.listen(8080, function () {
  console.log("Servidor escuchando en el puerto 3000");
});
