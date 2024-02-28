const RoleValReq = require("../validations/RoleValReq");
const { isEmpty } = require("lodash");
const {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole,
} = require("../services/RoleService");

const GetAll = async (req, res) => {
  try {
    const response = await getAllRoles();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: "Ocurrio un error en la operación" });
  }
};

const GetById = async (req, res) => {
  try {
    const response = await getRoleById(req.params.id);
    if (response) {
      res.json(response);
    } else {
      res.status(404).json({ error: "Rol no encontrado" });
    }
  } catch (error) {
    res.status(400).json({ error: "Ocurrio un error en la operación" });
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
      const request = await RoleValReq(req, res);
      if (!request) {
        return;
      }
      const response = await createRole(request);
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
      const request = await RoleValReq(req.body, res);
      if (!request) {
        return;
      }
      const response = await updateRole(req.params.id, request);
      if (response) {
        res.json(response);
      } else {
        res.status(404).json({ error: "Rol no exciste" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: "Ocurrio un error en la operación" });
  }
};

const Delete = async (req, res) => {
  try {
    const response = await deleteRole(req.params.id);
    if (response) {
      res.json({ message: "Rol eliminado correctamente" });
    } else {
      res.status(404).json({ error: "Sucursal no exciste" });
    }
  } catch (error) {
    res.status(400).json({ error: "Ocurrio un error en la operación"});
  }
};

module.exports = {
  Create,
  Update,
  GetAll,
  GetById,
  Delete,
};
