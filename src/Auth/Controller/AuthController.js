const Login = (req, res) => {
  try {
    res.status(201).json({"hola":true});
  } catch (error) {
    res
      .status(400)
      .json({ error: "Ocurrio un error en la operación: " + error });
  }
};

module.exports = {Login}
