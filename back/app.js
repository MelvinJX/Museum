const cors = require("cors");
const express = require("express");
const route = require("./route");
const userRoute = require("./route-user");
const loginRoute = require("./login")
const { connect } = require("mongoose");
require("dotenv").config();

const URI = process.env.NODE_ENV === "production" ? process.env.BDD_PROD : process.env.BDD_DEV

connect(URI)
    .then(() => console.log("Connexion à MongoDB réussie."))
    .catch((ex) => console.log(ex))

const PORT = 4010;
const app = express();

app.use(cors());
app.use(express.json()); // ce middleware à mettre avant les autres middleware
app.use("/oeuvre", route);
app.use("/user", userRoute);
app.use("/login", loginRoute);

app.listen(PORT , () => console.log(`Express start sur port : ${PORT}`));