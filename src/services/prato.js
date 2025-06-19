const Prato = require("../models/prato");

async function list(query = {}) {
  return await Prato.findAll({ where: query });
}

async function get(id) {
  const prato = await Prato.findByPk(id);
  if (!prato) {
    throw new NotFoundError("Prato não encontrado");
  }
  return prato;
}

async function create(pratoData) {
  return await Prato.create(pratoData);
}

async function update(id, pratoData) {
  const prato = await get(id);
  if (!prato) {
    throw new NotFoundError("Prato não encontrado");
  }
  return await prato.update(pratoData);
}

async function remove(id) {
  const prato = await get(id);
  if (!prato) {
    throw new NotFoundError("Prato não encontrado");
  }
  await prato.destroy();
}

module.exports = {
  list,
  get,
  create,
  update,
  remove,
};
