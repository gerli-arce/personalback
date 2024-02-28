const GnId = require("../assets/Generator");
const {
  messages,
  branchSchema,
  roleSchema,
  personSchema,
  userSchema,
} = require("./ValidationModels");
const { isEmpty } = require("lodash");
const { generatePasswordHash } = require("../assets/auth");

const {getDateTime} = require("../assets/Date");


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

const ValRequestUser = async (req, res) => {
  try {
    if (isEmpty(req.body)) {
      res
        .status(400)
        .json({ error: "No se han enviado datos para procesar la solicitud" });
      return false;
    } else {
      const pp = req.body;
      console.log(pp);
      pp.password = await generatePasswordHash(pp.password);
      pp.relative_id = GnId();
      pp.creation_date = getDateTime();
      pp.update_date = getDateTime();
      console.log(pp);
      const { error, value } = userSchema.validate(pp, {
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
    console.error(error)
    res.status(500).json({ error: "Error en los datos de entrada" });
    return false;
  }
};

module.exports = {
  ValRequestBranch,
  ValRequestRole,
  ValRequestPerson,
  ValRequestUser,
};
