const Joi = require("joi");

const Messages = require("../validations/Messages");

const branchSchema = Joi.object({
  id: Joi.number(),
  name: Joi.string().required(),
  correlative: Joi.string().required(),
  ubigeo: Joi.string().required(),
  address: Joi.string().required(),
  description: Joi.string(),
  color: Joi.string(),
  status: Joi.boolean().required(),
});

const ValRequestBranch = async (pp, res) => {
  try {
    const { error, value } = branchSchema.validate(pp, {
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
  } catch (error) {
    res.status(500).json({ error: "Error en los datos de entrada" });
    return false;
  }
};

module.exports = ValRequestBranch;
