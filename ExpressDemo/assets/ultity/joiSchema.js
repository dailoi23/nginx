const Joi = require('joi');

const nameSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    
    type: Joi.string()
        .max(35),
    
    cost: Joi.number()
        .greater(0)
    
});

module.exports.nameschema = nameSchema ; 