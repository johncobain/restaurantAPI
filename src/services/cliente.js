const Cliente = require("../models/cliente");

async function list() {
  return await Cliente.findAll({ where: { active: true } });
}

async function get(id) {
  const cliente = await Cliente.findByPk(id);
  if (!cliente || !cliente.active) {
    throw new Error("Cliente não encontrado");
  }
  return cliente;
}

async function create(clienteData) {
  if (!clienteData.nome || !clienteData.data_nascimento || !clienteData.cpf) {
    throw new Error("Dados do cliente incompletos");
  }
  const existingCliente = await Cliente.findOne({
    where: { cpf: clienteData.cpf },
  });
  if (existingCliente) {
    if (existingCliente.active) {
      throw new Error("Cliente com este CPF já existe e está ativo.");
    }
    throw new Error(
      "Cliente com CPF já existe, mas está inativo. Ative-o para reutilizar (use o método PUT /clientes/:id para ativar)."
    );
  }
  const data = { ...clienteData, active: true };
  const cliente = await Cliente.create(data);
  return cliente;
}

async function update(id, clienteData) {
  const cliente = await Cliente.findByPk(id);
  if (!cliente) {
    throw new Error("Cliente não encontrado");
  }
  await cliente.update(clienteData);
  cliente.active = true;
  await cliente.save();
  return cliente;
}

async function remove(id) {
  const cliente = await Cliente.findByPk(id);
  if (!cliente) {
    throw new Error("Cliente não encontrado");
  }
  cliente.active = false;
  await cliente.save();
  return cliente;
}

module.exports = { list, get, create, update, remove };
