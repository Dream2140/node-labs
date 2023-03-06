const Joi = require('joi');

const validateRequest = require('../index');

const schema = Joi.object({
    body: {
        name: Joi.string().min(3),
        directorId: Joi.string().guid({
            version: [
                'uuidv4'
            ]
        }).required(),
        genres: Joi.array()
    }
}).unknown(true);

module.exports = validateRequest(schema);
