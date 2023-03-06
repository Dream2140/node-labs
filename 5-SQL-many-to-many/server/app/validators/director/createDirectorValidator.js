const Joi = require('joi');

const validateRequest = require('../index');

const schema = Joi.object({
    body: {
        fullName: Joi.string().alphanum().min(3).required(),
        birth: Joi.number().integer().min(1900).max(2022),
    }
}).unknown(true);

module.exports = validateRequest(schema);
