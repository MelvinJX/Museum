const { Router } = require("express");
const { Oeuvre } = require("./model");
const { oeuvreSchemaJoi } = require("./verif");
const { idValid } = require("./middleware");

const route = Router();

route.get("/", (request, response) => {
    response.json("Bienvenue sur mon application de musée !");
});

route.get("/all", async (request, response) => {
    const allOeuvres = await Oeuvre.find();
    response.json(allOeuvres);
});

route.get("/:id", async (request, response) => {
    const id = request.params.id;

    const oeuvreToFind = await Oeuvre.findById(id);

    if(!oeuvreToFind) return response.status(404).json({Message : `L'oeuvre avec l'id ${id} n'existe pas.`});

    response.json(oeuvreToFind);
});

route.post("/", (request, response) => {
    const { body } = request;

    const { error } = oeuvreSchemaJoi.validate(body, { abortEarly : false });
    if(error) return response.status(400).json(error.details);

    const newOeuvre = new Oeuvre(body);
    newOeuvre.save();
    response.json(newOeuvre);
});

route.delete("/:id",idValid ,async (request, response) => {
    const id = request.params.id;
    const oeuvreToDelete = await Oeuvre.findByIdAndRemove(id);

    if(!oeuvreToDelete) return response.status(404).json({Message : `L'oeuvre avec l'identifiant : ${id} n'existe pas.`});

    response.json({Message : `L'article avec l'identifiant ${id} a bien été supprimé.`});
})

route.put("/:id", idValid, async (request, response) => {
    const id = request.params.id;

    const { error } = oeuvreSchemaJoi.validate(body, { abortEarly : false });
    if(error) return response.status(400).json(error.details);

    const oeuvreToUpdate = Oeuvre.findByIdAndUpdate(id, { $set : body }, { new : true });
    if(!oeuvreToUpdate) return response.status(404).json({Message : `L'article avec l'id ${id} n'existe pas.`});

    response.json(oeuvreToUpdate);
})

module.exports = route;