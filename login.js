const { Router } = require("express");
const { User } = require("./model");
const { compare } = require("bcrypt");
const JWT = require("jsonwebtoken");
const { userSchemaJoi } = require("./verif");

const route = Router();

route.post("/", async (request, response) => {
    const { body } = request;

    // Vérifier si la structure est bonne
    const { error } = userSchemaJoi.validate(body, { abortEarly : false });
    if(error) return response.status(400).json(error.details);

    // Vérifier si il y a un utilisateur avec cet email
    const findUser = await User.findOne({ email: body.email });
    if(!findUser) return response.status(404).json({Message : "Nous n'avons pas trouvé d'utilisateurs ces identifiants."});

    // Vérifier si les mots de passes correspondent
    const isSamePwd = await compare(body.password, findUser.password);
    if(!isSamePwd) return response.status(404).json({Message : "Nous n'avons pas trouvé d'utilisateurs ces identifiants PWD."});

    const profil = {
        _id: findUser._id,
        email: findUser.email,
        role: findUser.role ? findUser.role : "visiteur"
    }

    const token = JWT.sign(profil, process.env.PRIVATE_KEY);

    response.json({Message : `Bienvenue ${profil.email}`, token : token});
})

module.exports = route;