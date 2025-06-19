const { NotFoundError } = require("../errors/AppError");
const Pedido = require("../models/pedido");

async function list(query = {}) {
  return await Pedido.findAll({ where: query });
}

async function get(id) {
  return await Pedido.findByPk(id);
}

async function create(data) {
  data = { ...data, atendido: false };
  return await Pedido.create(data);
}

async function update(id, data) {
  const pedido = await Pedido.findByPk(id);
  if (!pedido) throw new NotFoundError("Pedido não encontrado");
  return await pedido.update(data);
}

async function remove(id) {
  const pedido = await Pedido.findByPk(id);
  if (!pedido) throw new NotFoundError("Pedido não encontrado");
  return await pedido.destroy();
}

async function atendido(id) {
  const pedido = await Pedido.findByPk(id);
  if (!pedido) throw new NotFoundError("Pedido não encontrado");
  pedido.atendido = true;
  return await pedido.save();
}

async function removeAtendido(id) {
  const pedido = await Pedido.findByPk(id);
  if (!pedido) throw new NotFoundError("Pedido não encontrado");
  pedido.atendido = false;
  return await pedido.save();
}

module.exports = {
  list,
  get,
  create,
  update,
  remove,
  atendido,
  removeAtendido,
};
