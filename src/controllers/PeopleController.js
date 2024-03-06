const PersonValReq = require("../validations/PersonValReq");
const { isEmpty } = require("lodash");
const GnId = require("../assets/Generator");
const{
    getAllPeople,
    getPersonById,
    createPerson,
    updatePersonById,
    deletePersonById,
  } = require("../services/PeopleService");

const GetAll = async (req, res) => {
  try {
    const response = await getAllPeople();
    console.log(response)
    res.json(response);
  } catch (error) {
    res.status(400).json({ error: "Ocurrio un error en la operación" });
  }
};

const GetById = async (req, res) => {
  try {
    const response = await getPersonById(req.params.id);
    console.log(req.params.id)
    if (response) {
      res.json(response);
    } else {
      res.status(404).json({ error: "Persona no encontrada" });
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
      const request = await PersonValReq(req, res);

      if (!request) {
        return;
      }

      request.relative_id =  GnId();
      console.log(request)
      const response = await createPerson(request);
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
      const request = await PersonValReq(req, res);
      if (!request) {
        return;
      }
      const response = await updatePersonById(req.params.id, request);
      if (response) {
        res.json(response);
      } else {
        res.status(404).json({ error: "Persona no exciste" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: "Ocurrio un error en la operación" });
  }
};

const Delete = async (req, res) => {
  try {
    const response = await deletePersonById(req.params.id);
    if (response) {
      res.json({ message: "Persona eliminado correctamente" });
    } else {
      res.status(404).json({ error: "Persona no exciste" });
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
