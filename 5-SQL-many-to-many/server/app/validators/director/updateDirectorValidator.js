const Joi = require('joi');

const validateRequest = require('../index');

const schema = Joi.object({
    params: {
        id: Joi.string().guid({
            version: [
                'uuidv4'
            ]
        }).required(),
    },
    body: {
        fullName: Joi.string().alphanum().min(3),
        birth: Joi.number().integer().min(1900).max(2022),
    }
}).unknown(true);

module.exports = validateRequest(schema);
