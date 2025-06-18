const service = require("../services/cliente");

async function list(req, res) {
  try {
    const clientes = await service.list();
    return res.status(200).json(clientes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function get(req, res) {
  const { id } = req.params;
  try {
    const cliente = await service.get(id);
    return res.status(200).json(cliente);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

async function create(req, res) {
  const clienteData = req.body;
  try {
    const cliente = await service.create(clienteData);
    return res.status(201).json({
      message: "Cliente criado com sucesso",
      cliente: cliente,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function update(req, res) {
  const { id } = req.params;
  const clienteData = req.body;
  try {
    const cliente = await service.update(id, clienteData);
    return res.status(200).json({
      message: "Cliente editado com sucesso!",
      cliente: cliente,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function remove(req, res) {
  const { id } = req.params;
  try {
    const cliente = await service.remove(id);
    return res.status(200).json({
      message: "Cliente removido com sucesso",
      cliente: cliente,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  list,
  get,
  create,
  update,
  remove,
};
