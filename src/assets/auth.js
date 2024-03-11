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

function checkPermissions(permissions, branch, view, permission) {
  try {
    let status = false;
    let root = false;
    let admin = false;

    if (permissions.hasOwnProperty("root")) {
      root = true;
    }

    if (permissions.hasOwnProperty("admin")) {
      admin = true;
      if (view === "system") {
        admin = false;
      }
    }

    for (const branch_ of permissions) {
      if (branch_.hasOwnProperty(branch)) {
        for (const views_ of branch_[branch]) {
          if (views_.hasOwnProperty(view)) {
            const canReadUsers = views_[view][permission];
            status = canReadUsers;
            break;
          }
        }
      }
    }

    return status || root || admin;
  } catch (error) {
    console.error("Error checking permissions:", error);
    return false;
  }
}

const authorization = (view, permission) => {
  return (req, res, next) => {
    try {
      const permissions = JSON.parse(req.cookies?.permissions);
      if (!permissions) {
        res.status(401).json({ error: "Los permisos deven que ser enviados" });
      }
      const branch = req.headers?.branch;
      if (!branch) {
        res.status(401).json({ error: "Los headers deven ser enviados" });
      }
      console.log("branch: " + branch);
      console.log("permissions: " + permissions);
      // const authorized = checkPermissions(permissions, branch, view, permission);
      next();
    } catch (error) {
      console.error("Error checking permissions:", error);
    }
  };
};

module.exports = {
  generatePasswordHash,
  comparePasswordToHash,
  jwtValidation,
  authorization,
};
