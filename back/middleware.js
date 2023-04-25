const { isValidObjectId } = require("mongoose");
const { oeuvreSchemaJoi } = require("./verif");
const JWT = require("jsonwebtoken");

function idValidMDB(request, response, next){
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

function isLogged(request, response, next){
    const token = request.header("x-token");

    if(!token) return response.status(401).json({Message : "Veuillez vous connecter pour réaliser cette opération."});

    try{
        const payload = JWT.verify(token, process.env.PRIVATE_KEY);
        request.user = payload;

        next();
    }
    catch(ex){
        response.status(400).json({Message : "JWT invalide"});
    }
}

function isAdmin(request, response, next){
    if(request.user.role !== "admin") return response.status(401).json({Message : "Autorisation refusée."});

    next();
}

module.exports.idValidMDB = idValidMDB;
module.exports.isValidOeuvre = isValidOeuvre;
module.exports.isLogged = isLogged;
module.exports.isAdmin = isAdmin;