const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { comparePasswordToHash } = require("../../assets/auth");

const Login = async (req, res) => {
  try {
    var pp = req.body;
    const user = await User.findOne({
      where: {
        username: pp.username,
      },
    });
    if (!user) {
      res.status(401).json({ error: "No se encontro el usuario: " + error });
    }
    const isPasswordValid = await comparePasswordToHash(pp.password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: "Contraseña incorrecta." });
    }

    res.json(user);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Ocurrio un error en la operación: " + error });
  }
};

module.exports = { Login };
