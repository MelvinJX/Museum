const { Router } = require("express");
const { User } = require("./model");
const { userSchemaJoi } = require("./verif");
const { genSalt, hash } = require("bcrypt");

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
    const allUsers = await User.find();
    response.json(allUsers);
})

module.exports = route;