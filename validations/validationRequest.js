const GnId = require("../assets/utilities/Generator");
const {
  messages,
  branchSchema,
  roleSchema,
  personSchema,
} = require("./ValidationModels");
const { isEmpty } = require("lodash");

const ValRequestBranch = async (req, res) => {
  try {
    if (isEmpty(req.body)) {
      res
        .status(400)
        .json({ error: "No se han enviado datos para procesar la solicitud" });
      return false;
    } else {
      const { error, value } = branchSchema.validate(req.body, {
        abortEarly: false,
        messages: messages,
      });
      if (error) {
        const errors = error.details.map((detail) =>
          detail.message.replace(/"/g, "")
        );
        res.status(400).json({ error: errors });
        return;
      }
      return value;
    }
  } catch (error) {
    res.status(500).json({ error: "Error en los datos de entrada" });
    return false;
  }
};

const ValRequestRole = async (req, res) => {
  try {
    if (isEmpty(req.body)) {
      res
        .status(400)
        .json({ error: "No se han enviado datos para procesar la solicitud" });
      return false;
    } else {
      const { error, value } = roleSchema.validate(req.body, {
        abortEarly: false,
        messages: messages,
      });
      if (error) {
        const errors = error.details.map((detail) =>
          detail.message.replace(/"/g, "")
        );
        res.status(400).json({ error: errors });
        return;
      }
      return value;
    }
  } catch (error) {
    res.status(500).json({ error: "Error en los datos de entrada" });
    return false;
  }
};

const ValRequestPerson = async (req, res) => {
  try {
    if (isEmpty(req.body)) {
      res
        .status(400)
        .json({ error: "No se han enviado datos para procesar la solicitud" });
      return false;
    } else {
      const pp = req.body;
      pp.relative_id = GnId();
      const { error, value } = personSchema.validate(req.body, {
        abortEarly: false,
        messages: messages,
      });
      if (error) {
        const errors = error.details.map((detail) =>
          detail.message.replace(/"/g, "")
        );
        res.status(400).json({ error: errors });
        return;
      }
      return value;
    }
  } catch (error) {
    res.status(500).json({ error: "Error en los datos de entrada" });
    return false;
  }
};

module.exports = { ValRequestBranch, ValRequestRole, ValRequestPerson };
