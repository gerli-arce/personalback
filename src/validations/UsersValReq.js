const Joi = require("joi");
const { isEmpty } = require("lodash");

const Messages = require("./Messages");

const userSchema = Joi.object({
    id: Joi.number(),
    username: Joi.string().required(),
    password: Joi.string(),
    email: Joi.string().email().required(),
    relative_id: Joi.string(),
    auth_token: Joi.string(),
    _person: Joi.number().required(),
    _branch: Joi.number().required(),
    image_type: Joi.string(),
    image_full: Joi.binary(),
    image_mini: Joi.binary(),
    origin: Joi.string(),
    _role: Joi.number().required(),
    creation_date: Joi.date(),
    _creation_user: Joi.number(),
    update_date: Joi.date(),
    _update_user: Joi.number(),
    status: Joi.boolean(),
  });


const UserValReq = async (req, res) => {
    try {
      if (isEmpty(req.body)) {
        res
          .status(400)
          .json({ error: "No se han enviado datos para procesar la solicitud" });
        return false;
      } else {
        const pp = req.body;
        const { error, value } = userSchema.validate(pp, {
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
      console.error(error)
      res.status(500).json({ error: "Error en los datos de entrada" });
      return false;
    }
  };
  
module.exports = UserValReq
  