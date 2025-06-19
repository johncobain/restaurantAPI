require("dotenv").config({ path: ".env" });
require("./database/database.js");
const { errorHandler } = require("./middlewares/middlewares.js");

const express = require("express");

const Cliente = require("./models/cliente");
const Prato = require("./models/prato");
const Pedido = require("./models/pedido");

const models = {
  Cliente,
  Prato,
  Pedido,
};

Object.values(models)
  .filter((model) => typeof model.associate === "function")
  .forEach((model) => model.associate(models));

const clienteRouter = require("./routes/cliente");
const pratoRouter = require("./routes/prato");
const pedidoRouter = require("./routes/pedido");

const app = express();
app.use(express.json());

app.use("/clientes", clienteRouter);
app.use("/pratos", pratoRouter);
app.use("/pedidos", pedidoRouter);

app.use(errorHandler);

app.listen(
  process.env.PORT,
  console.log(`Servidor escutando na porta ${process.env.PORT}`)
);

module.exports = app;
