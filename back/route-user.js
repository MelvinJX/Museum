const { Router } = require("express");
const { User } = require("./model");
const { userSchemaJoi } = require("./verif");
const { genSalt, hash } = require("bcrypt");
const { isValidObjectId } = require("mongoose");

const route = Router();

route.post("/", async (request, response) => {
    const { body } = request;

    const { error } = userSchemaJoi.validate(body, { abortEarly : false });
    if(error) return response.status(400).json(error.details);

    const existEmail = await User.find({email : body.email});
    if(existEmail.length > 0) return response.status(400).json({Message : `L'email ${body.email} est déjà pris.`});

    const salt = await genSalt(10);
    const hashPassword = await hash(body.password, salt);

    const userToCreate = new User({...body, password: hashPassword});
    await userToCreate.save();

    response.json({Message : `L'utilisateur a été créé`});
});

route.get("/all", async (request, response) => {
    const allUsers = await User.find({}).select({_id: 1, email: 1, role: 1});
    response.json(allUsers);
});

route.delete("/:id", async (request, response) => {
    const id = request.params.id;
    
    if(!isValidObjectId(id)) return response.status(400).json({Message : `L'id ${id} n'est pas valide pour MongoDB.`});
    const userToDelete = await User.findByIdAndRemove(id);

    if(!userToDelete) return response.status(404).json({Message : `L'utilisateur avec l'id ${id} n'existe pas.`});

    response.json({Message : `L'utilisateur a bien été supprimé.`});
});

module.exports = route;