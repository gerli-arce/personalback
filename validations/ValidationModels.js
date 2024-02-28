const Joi = require("joi");

const branchSchema = Joi.object({
  name: Joi.string().required(),
  correlative: Joi.string().required(),
  ubigeo: Joi.string().required(),
  address: Joi.string().required(),
  description: Joi.string(),
  color: Joi.string(),
  status: Joi.boolean().required(),
});

const roleSchema = Joi.object({
  role: Joi.string().required(),
  priority: Joi.number().required(),
  permissions: Joi.array().required(),
  description: Joi.string(),
  status: Joi.boolean(),
});

const messages = {
  "any.required": '"{#label}" es requerido',
  "any.empty": '"{#label}" no puede estar vacío',
  "array.base": '"{#label}" debe ser un array',
  "any.unknown": '"{#label}" no está permitido',
  "any.invalid": '"{#label}" contiene un valor inválido',
  "any.allowOnly": '"{#label}" debe ser uno de {#valids}',
  "boolean.base": '"{#label}" debe ser un booleano',
  "date.base": '"{#label}" debe ser una fecha válida',
  "date.min": '"{#label}" debe ser posterior a {#limit}',
  "date.max": '"{#label}" debe ser anterior a {#limit}',
  "date.less": '"{#label}" debe ser anterior a {#limit}',
  "date.greater": '"{#label}" debe ser posterior a {#limit}',
  "date.isoDate": '"{#label}" debe ser una fecha ISO 8601 válida',
  "function.base": '"{#label}" debe ser una función',
  "function.arity": '"{#label}" debe tener una aridad de {#n}',
  "function.minArity": '"{#label}" debe tener una aridad mínima de {#n}',
  "function.maxArity": '"{#label}" debe tener una aridad máxima de {#n}',
  "function.ref": '"{#label}" debe ser una referencia Joi',
  "number.base": '"{#label}" debe ser un número',
  "number.min": '"{#label}" debe ser al menos {#limit}',
  "number.max": '"{#label}" no puede ser mayor que {#limit}',
  "number.less": '"{#label}" debe ser menor que {#limit}',
  "number.greater": '"{#label}" debe ser mayor que {#limit}',
  "number.integer": '"{#label}" debe ser un entero',
  "number.negative": '"{#label}" debe ser un número negativo',
  "number.positive": '"{#label}" debe ser un número positivo',
  "number.precision":
    '"{#label}" debe tener una precisión de {#limit} decimales',
  "number.ref": '"{#label}" las referencias "{#ref}" que no son números',
  "number.multiple": '"{#label}" debe ser un múltiplo de {#multiple}',
  "string.base": '"{#label}" debe ser una cadena de texto',
  "string.min": '"{#label}" debe tener al menos {#limit} caracteres',
  "string.max": '"{#label}" no puede tener más de {#limit} caracteres',
  "string.length": '"{#label}" debe tener exactamente {#limit} caracteres',
  "string.alphanum": '"{#label}" solo puede contener caracteres alfanuméricos',
  "string.token":
    '"{#label}" solo puede contener caracteres alfanuméricos y guiones bajos',
  "string.regex.base": '"{#label}" debe coincidir con el patrón {#regex}',
  "string.email": '"{#label}" debe ser un correo electrónico válido',
  "string.uri": '"{#label}" debe ser una URI válida',
  "string.pattern.base":
    '"{#label}" con valor "{:#value}" no coincide con el patrón requerido: {#regex}',
  "string.pattern.name":
    '"{#label}" con valor "{:#value}" no coincide con el patrón {#name}',
  "string.pattern.invert.base":
    '"{#label}" con valor "{:#value}" coincide con el patrón invertido: {#regex}',
  "string.pattern.invert.name":
    '"{#label}" con valor "{:#value}" coincide con el patrón invertido {#name}',
  "string.trim":
    '"{#label}" no debe tener espacios en blanco al inicio o al final',
  "string.case": '"{#label}" debe estar en {#case} case',
  "string.empty": '"{#label}" no puede estar vacío',
  "string.min":
    '"{#label}" longitud debe ser al menos {#limit} caracteres de largo',
  "string.max":
    '"{#label}" longitud debe ser menor o igual a {#limit} caracteres',
  "string.length": '"{#label}" longitud debe ser {#limit} caracteres de largo',
  "string.base64": '"{#label}" debe ser una cadena base64 válida',
  "string.dataUri": '"{#label}" debe ser una cadena de uri de datos válida',
};

module.exports = {
  messages,
  branchSchema,
  roleSchema,
};
