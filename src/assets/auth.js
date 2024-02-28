const bcrypt = require("bcrypt");

// Función para generar un hash de una contraseña
const generatePasswordHash = async (password) => {
  const saltRounds = 10;
  console.log('iniciando sifrado de contraseña')
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) {
        console.log('error al cifrar contraseña: '+err)
        reject(err);
      } else {
        console.log('contraseña cifrada: '+hash)
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

module.exports = {
  generatePasswordHash,
  comparePasswordToHash,
};
