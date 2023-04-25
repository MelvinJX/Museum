const { isValidObjectId } = require("mongoose");
const { oeuvreSchemaJoi } = require("./verif");

function idValid(request, response, next){
    const id = request.params.id;

    if(!isValidObjectId(id)) return response.status(400).json({Message : `L'id ${id} n'est pas valide pour MongoDB !`});

    next();
}

function isValidOeuvre(request, response, next){
    const { body } = request;

    const { error } = oeuvreSchemaJoi.validate(body, { abortEarly : false });
    if(error) return response.status(400).json(error.details);

    next();
}

module.exports.idValid = idValid;
module.exports.isValidOeuvre = isValidOeuvre;