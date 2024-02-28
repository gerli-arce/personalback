const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const User = require("./models/UserModel.js");
const {BranchRoutes, RoleRoutes, PeopleRoutes, UserRoutes} = require("./routes");


const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

app.use('/branches', BranchRoutes);
app.use('/roles', RoleRoutes);
app.use('/people', PeopleRoutes);
app.use('/users', UserRoutes);

app.use(express.json());

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
  console.log("Servidor escuchando en el puerto 8080");
});
