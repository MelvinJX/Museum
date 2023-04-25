const { isValidObjectId } = require("mongoose");

function idValid(request, response, next){
    const id = request.params.id;

    if(!isValidObjectId(id)) return response.status(400).json({Message : `L'id ${id} n'est pas valide pour MongoDB !`});

    next();
}

module.exports.idValid = idValid;