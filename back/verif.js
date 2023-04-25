const Joi = require("joi");

const oeuvreSchemaJoi = Joi.object({
    nom : Joi.string().min(2).max(255).required(),
    description : Joi.string().min(5).max(10000).required(),
    image : Joi.string().required(),
    auteur : Joi.string().min(5).max(255).required(),
    dt_creation : Joi.date()
});

const userSchemaJoi = Joi.object({
    email : Joi.string().email({ tlds : { allow : false} }).max(255).required(),
    password : Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,255}$/).required(),
    role : Joi.string().valid("visiteur","admin")
})

const loginSchemaJoi = Joi.object({
    email : Joi.string().min(2).max(255).required(),
    password : Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,255}$/).required()
})

module.exports.oeuvreSchemaJoi = oeuvreSchemaJoi;
module.exports.userSchemaJoi = userSchemaJoi;
module.exports.loginSchemaJoi = loginSchemaJoi;