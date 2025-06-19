require("dotenv").config({ path: ".env" });
require("./database/database.js");
const express = require("express");
const clienteRouter = require("./routes/cliente");
const pratoRouter = require("./routes/prato");
const pedidoRouter = require("./routes/pedido");
const { errorHandler } = require("./middlewares/middlewares.js");

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
