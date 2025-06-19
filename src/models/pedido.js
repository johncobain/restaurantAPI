const database = require("../database/database.js");
const Sequelize = require("sequelize");

const Pedido = database.define(
  "pedido",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clienteId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "clientes",
        key: "id",
      },
    },
    pratoId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "pratos",
        key: "id",
      },
    },
    atendido: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Pedido;
