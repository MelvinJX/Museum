const { Schema, model } = require("mongoose");
const newDate = new Date()

const oeuvreSchema = new Schema({
    nom : String,
    description : String,
    image : String,
    auteur : String,
    dt_creation : { type : Date, default : Date.now() }
});

const userSchema = new Schema({
    email : String,
    password : String,
    role : { type : String, enum : ['visiteur', 'admin'], default : 'visiteur'}
})

const Oeuvre = model("oeuvres", oeuvreSchema);
const User = model("utilisateurs", userSchema);

module.exports.Oeuvre = Oeuvre;
module.exports.User = User;