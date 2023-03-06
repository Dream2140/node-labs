const Joi = require('joi');

const validateRequest = require('../index');

const schema = Joi.object({

    body: {
        name: Joi.string().min(3),
        directorId: Joi.string().guid({
            version: [
                'uuidv4'
            ]
        }),
        genres: Joi.array(),
    },
    params: {
        id: Joi.string().guid({
            version: [
                'uuidv4'
            ]
        }).required(),
    }
}).unknown(true);


module.exports = validateRequest(schema);
