const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const routes = require("./src/routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());

app.use('/', routes);

app.use(express.json());

app.listen(8080, function () {
  console.log("Servidor escuchando en el puerto 8080");
});
