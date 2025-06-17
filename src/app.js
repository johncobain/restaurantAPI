require("dotenv").config({path: ".env"});
require("./database/database.js");
const express = require("express");


const app = express();
app.use(express.json())

app.listen(process.env.PORT, console.log(`Servidor escutando na porta ${process.env.PORT}`));

module.exports = app;
