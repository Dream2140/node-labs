const Joi = require('joi');

const validateRequest = require('../index');

const schema = Joi.object({
    body: {
        title: Joi.string().min(3).required(),
    }
}).unknown(true);

module.exports = validateRequest(schema);
