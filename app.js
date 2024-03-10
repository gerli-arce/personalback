const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const AuthRoutes = require("./src/Auth/Routes/AuthRoutes");
const {jwtValidation} = require("./src/assets/auth");
const routes = require("./src/routes");

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());

app.use("/session", AuthRoutes);

app.use("/api", jwtValidation, routes);

app.use(express.json());

app.listen(8080, function () {
  console.log("Servidor escuchando en el puerto 8080");
});
