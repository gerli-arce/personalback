const Joi = require("joi");
const { isEmpty } = require("lodash");

const Messages = require("../validations/Messages");


const roleSchema = Joi.object({
  role: Joi.string().required(),
  priority: Joi.number().required(),
  permissions: Joi.array().required(),
  description: Joi.string(),
  status: Joi.boolean(),
});

const RoleValReq = async (req, res) => {
  try {
    if (isEmpty(req.body)) {
      res
        .status(400)
        .json({ error: "No se han enviado datos para procesar la solicitud" });
      return false;
    } else {
      const { error, value } = roleSchema.validate(req.body, {
        abortEarly: false,
        messages: Messages,
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
    res.status(500).json({ error: "Error en los datos de entrada: "+error });
    return false;
  }
};

module.exports = RoleValReq;
