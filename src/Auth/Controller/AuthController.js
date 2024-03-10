const { User } = require("../../models");
const { comparePasswordToHash } = require("../../assets/auth");
const jwt = require("jsonwebtoken");
const moment = require("moment");
require('dotenv').config();


const key = process.env.KEY;

const Login = async (req, res) => {
  try {
    console.log(key)
    var pp = req.body;
    let user = await User.findOne({
      where: {
        username: pp.username,
      },
    });
    if (!user) {
      res.status(401).json({ error: "No se encontro el usuario: " + error });
    }
    const isPasswordValid = await comparePasswordToHash(
      pp.password,
      user.password
    );

    if (!isPasswordValid) {
      res.status(401).json({ error: "Contraseña incorrecta." });
    }

    const sub = user.id;
    const name = user.name;
    const exp = moment().add(1, "minutes").unix();

    const token = await jwt.sign(
      {
        sub,
        name,
        exp
      },
      key
    );

    var response = {};
    response.data = user;
    response.data.auth_token = token;
    response.data.password = undefined;
    response.message="Operacion correcta" 
    response.status = 200;

    console.log(token)
    console.log(response)
    // user.key = key;

    res.cookie("auth_token", token)

    res.json(response);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Ocurrio un error en la operación: " + error });
  }
};

const Init = async(req, res)=>{
  try {
    if(!req.headers.authorization){
      res.status(400)
      .json({ error: "Los heades deven ser enviados" })
    }
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, key)
    console.log(payload)
  
    // if(moment().unix() > payload.exp){
    //   return res.status(401).send({error:"token expired"})
    // }
    res.send("I'am private");
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      // Manejar el caso de token expirado
      res.status(401).json({ error: "Token expirado" });
    } else {
      // Manejar otros tipos de errores
      res.status(400).json({ error: "Ocurrio un error en la operación: " + error });
    }
  }
}

module.exports = { Login, Init };
