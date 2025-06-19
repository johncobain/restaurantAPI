const {
  NotFoundError,
  BadRequestError,
  ConflictError,
} = require("../errors/AppError");
const Cliente = require("../models/cliente");

async function list(query = {}) {
  return await Cliente.findAll({ where: query });
}

async function get(id) {
  const cliente = await Cliente.findByPk(id);
  if (!cliente) {
    throw new NotFoundError("Cliente não encontrado");
  }
  return cliente;
}

async function getDetails(id) {
  const cliente = await Cliente.findByPk(id, {
    include: [
      {
        association: "pedidos",
      },
    ],
  });
  if (!cliente) {
    throw new NotFoundError("Cliente não encontrado");
  }
  return cliente;
}

async function create(clienteData) {
  if (!clienteData.nome || !clienteData.data_nascimento || !clienteData.cpf) {
    throw new BadRequestError("Dados do cliente incompletos"); // move to middleware
  }
  const existingCliente = await Cliente.findOne({
    where: { cpf: clienteData.cpf },
  });
  if (existingCliente) {
    if (existingCliente.active) {
      throw new ConflictError("Cliente com este CPF já existe e está ativo.");
    }
    throw new ConflictError(
      "Cliente com CPF já existe, mas está inativo. Ative-o para reutilizar (use o método POST em /clientes/active/:id para ativar)."
    );
  }
  const data = { ...clienteData, active: true };
  const cliente = await Cliente.create(data);
  return cliente;
}

async function update(id, clienteData) {
  const cliente = await Cliente.findByPk(id);
  if (!cliente || !cliente.active) {
    throw new NotFoundError("Cliente não encontrado ou inativo");
  }
  await cliente.update(clienteData);
  return cliente;
}

async function activate(id) {
  const cliente = await Cliente.findByPk(id);
  if (!cliente) {
    throw new NotFoundError("Cliente não encontrado");
  }
  if (cliente.active) {
    throw new ConflictError("Cliente já está ativo");
  }
  cliente.active = true;
  await cliente.save();
  return cliente;
}

async function removeActive(id) {
  const cliente = await Cliente.findByPk(id);
  if (!cliente || !cliente.active) {
    throw new NotFoundError("Cliente não encontrado ou inativo");
  }
  cliente.active = false;
  await cliente.save();
  return cliente;
}

async function remove(id) {
  const cliente = await Cliente.findByPk(id);
  if (!cliente) {
    throw new NotFoundError("Cliente não encontrado");
  }
  await cliente.destroy();
  return cliente;
}

module.exports = {
  list,
  get,
  getDetails,
  create,
  update,
  activate,
  removeActive,
  remove,
};
