const Joi = require("joi");
const { isEmpty } = require("lodash");

const Messages = require("./Messages");

const personSchema = Joi.object({
  id: Joi.number(),
  document_type: Joi.string().required(),
  document_number: Joi.string().required(),
  relative_id: Joi.string(),
  name: Joi.string().required(),
  lastname: Joi.string().required(),
  birthdate: Joi.date(),
  gender: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  address: Joi.string(),
  type: Joi.string().required(),
  _branch: Joi.number().required(),
  creation_date: Joi.date(),
  _creation_user: Joi.number(),
  update_date: Joi.date(),
  _update_user: Joi.number(),
  status: Joi.boolean(),
});

const PersonValReq = async (req, res) => {
  try {
    if (isEmpty(req.body)) {
      res
        .status(400)
        .json({ error: "No se han enviado datos para procesar la solicitud" });
      return false;
    } else {
      const { error, value } = personSchema.validate(req.body, {
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
    res.status(500).json({ error: "Error en los datos de entrada: " + error });
    return false;
  }
};

module.exports = PersonValReq;
