const ValRequestBranch = require("../validations/BranchValReq");
const { isEmpty } = require("lodash");
const {
  createBranch,
  getAllBranch,
  getBranchById,
  updateBranch,
  deleteBranch,
} = require("../services/BranchService");

const GetAll = async (req, res) => {
  try {
    const branches = await getAllBranch();
    res.status(200).json(branches);
  } catch (error) {
    res.status(400).json({ error: "Ocurrio un error en la operación" });
  }
};

const GetById = async (req, res) => {
  try {
    const branch = await getBranchById(req.params.id);
    if (branch) {
      res.json(branch);
    } else {
      res.status(404).json({ error: "Branch not found" });
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
      const branch = await ValRequestBranch(req.body, res);
      if (!branch) {
        return;
      }
      const newBranch = await createBranch(branch);
      res.status(201).json(newBranch);
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
      const branch = await ValRequestBranch(req.body, res);
      if (!branch) {
        return;
      }
      const updatedBranch = await updateBranch(req.params.id, branch);
      if (updatedBranch) {
        res.json(updatedBranch);
      } else {
        res.status(404).json({ error: "Sucursal no exciste" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: "Ocurrio un error en la operación" });
  }
};

const Delete = async (req, res) => {
  try {
    const deletedBranch = await deleteBranch(req.params.id);
    if (deletedBranch) {
      res.json({ message: "Sucursal eliminada correctamente" });
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
