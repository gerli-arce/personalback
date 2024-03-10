const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const key = process.env.KEY;
const { Role } = require("../models");

// Función para generar un hash de una contraseña
const generatePasswordHash = async (password) => {
  const saltRounds = 10;
  console.log("iniciando sifrado de contraseña");
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) {
        console.log("error al cifrar contraseña: " + err);
        reject(err);
      } else {
        console.log("contraseña cifrada: " + hash);
        resolve(hash);
      }
    });
  });
};

// Función para comparar una contraseña con un hash
const comparePasswordToHash = async (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result); // Esto será 'true' si las contraseñas coinciden, y 'false' si no coinciden
      }
    });
  });
};

const jwtValidation = (req, res, next) => {
  try {
    const token = req.cookies.auth_token;
    console.log("token: " + JSON.stringify(token));
    console.log("key: " + key);
    const validaPassword = jwt.verify(token, key);
    console.log(validaPassword);
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: "Token expirado" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res
        .status(401)
        .json({ error: "Token invalido, por favor inicie sesión" });
    } else {
      res
        .status(400)
        .json({ error: "Ocurrio un error en la operación: " + error });
    }
  }
};

const authorization = (module, permission) => {
  return (req, res, next) => {
    const permissions = JSON.parse(req.cookies.permissions);
    console.log("permissions: " + permissions);
    next();
  };
};

module.exports = {
  generatePasswordHash,
  comparePasswordToHash,
  jwtValidation,
  authorization,
};
