const UserValReq = require("../validations/UsersValReq");
const { isEmpty } = require("lodash");
const GnId = require("../assets/Generator");
const { generatePasswordHash } = require("../assets/auth");
const {getDateTime} = require("../assets/Date");
const{
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
  } = require("../services/UserService");

const GetAll = async (req, res) => {
  try {
    const response = await getAllUsers();
    res.json(response);
  } catch (error) {
    res.status(400).json({ error: "Ocurrio un error en la operación" });
  }
};

const GetById = async (req, res) => {
  try {
    const response = await getUserById(req.params.id);
    if (response) {
        delete response.password;
      res.json(response);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(400).json({ error: "Ocurrio un error en la operación: "+error });
  }
};

const Create = async (req, res) => {
  try {
    if (isEmpty(req.body)) {
      res
        .status(400)
        .json({ error: "No se han enviado datos para procesar la solicitud" });
      return false;
    } else {
      const pp = await UserValReq(req, res);

      if (!pp) {
        return;
      }
      pp.password = await generatePasswordHash(pp.password);
      pp.relative_id = GnId();
      pp.creation_date = getDateTime();
      pp.update_date = getDateTime();
      const response = await createUser(pp);

      res.status(201).json(response);
    }
  } catch (error) {
    res
      .status(400)
      .json({ error: "Ocurrio un error en la operación: " + error });
  }
};

const Update = async (req, res) => {
  try {
    if (isEmpty(req.body)) {
      res
        .status(400)
        .json({ error: "No se han enviado datos para procesar la solicitud" });
      return false;
    } else {
      const request = await UserValReq(req, res);
      if (!request) {
        return;
      }

      request.password = await generatePasswordHash(request.password);
      request.update_date = getDateTime();
      var response = await updateUser(req.params.id, request);
      if (response) {
        res.json(response);
      } else {
        res.status(404).json({ error: "Usuario no exciste" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: "Ocurrio un error en la operación" });
  }
};

const Delete = async (req, res) => {
  try {
    const response = await deleteUser(req.params.id);
    if (response) {
      res.json({ message: "Usuario eliminado correctamente" });
    } else {
      res.status(404).json({ error: "Usuario no exciste" });
    }
  } catch (error) {
    res.status(400).json({ error: "Ocurrio un error en la operación: "+error});
  }
};

module.exports = {
  Create,
  Update,
  GetAll,
  GetById,
  Delete,
};
