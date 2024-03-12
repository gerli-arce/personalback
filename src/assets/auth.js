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

function checkPermissions(permiss, branch, view, permission) {
  const permissions = JSON.parse(permiss)
  console.log("**Comprobando permisos:**");
  console.log("  - Rama:", branch);
  console.log("  - Vista:", view);
  console.log("  - Permiso:", permissions.root);

  try {
    const json = JSON.stringify(permissions);
    console.log("JSON válido:", json);
  } catch (error) {
    console.error("Error al validar JSON:", error);
    console.error("El objeto 'permissions' puede estar mal formateado");
  }

  let status = false;
  let root = false;
  let admin = false;

  try {
    if (permissions.hasOwnProperty("root")) {
      root = true;
      console.log("  - Permiso 'root' encontrado");
      return true; // Return true immediately for root permission
    } else {
      console.log("  - Permiso 'root' no encontrado");
    }

    if (permissions.hasOwnProperty("admin")) {
      admin = true;
      console.log("  - Permiso 'admin' encontrado");
      if (view === "system") {
        admin = false;
        console.log("  - Permiso 'admin' deshabilitado para vista 'system'");
      }
    } else {
      console.log("  - Permiso 'admin' no encontrado");
    }

    // Iterate through branches and views for specific permission
    for (const branchKey in permissions) {
      console.log("  - Revisando rama:", branchKey);
      if (branchKey === branch) {
        // Check for matching branch
        console.log("    - Rama coincide");
        const branchData = permissions[branchKey];
        for (const viewKey in branchData) {
          console.log("    - Revisando vista:", viewKey);
          if (viewKey === view) {
            // Check for matching view
            console.log("      - Vista coincide");
            const viewData = branchData[viewKey];
            if (
              viewData.hasOwnProperty(permission) &&
              viewData[permission] === true
            ) {
              status = true;
              console.log("      - Permiso encontrado:", permission);
              break; // Exit nested loops if permission found
            } else {
              console.log("      - Permiso no encontrado:", permission);
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Error checking permissions:", error);
    return false;
  }

  // Return final result based on status, root, or admin
  console.log("**Resultado final:**", status || root || admin);
  return status || root || admin;
}

const authorization = (view, permission) => {
  return async (req, res, next) => {
    // Haz que el middleware sea asíncrono
    try {
      const permissions = JSON.parse(req.cookies?.permissions);
      if (!permissions) {
        return res
          .status(401)
          .json({ error: "Los permisos deben ser enviados" });
      }
      const branch = req.headers?.branch;
      if (!branch) {
        return res
          .status(401)
          .json({ error: "Los headers deben ser enviados" });
      }
      console.log("branch: " + branch);
      console.log("permissions: " + permissions);

      const authorized = checkPermissions(
        permissions,
        branch,
        view,
        permission
      );
      if (authorized) {
        return next();
      }
      return res
        .status(401)
        .json({ error: "No tienes permisos para realizar esta acción" });
    } catch (error) {
      console.error("Error al verificar permisos:", error);
      return res.status(500).json({ error: "Error interno del servidor" }); // Maneja errores inesperados
    }
  };
};
module.exports = {
  generatePasswordHash,
  comparePasswordToHash,
  jwtValidation,
  authorization,
  checkPermissions,
};
