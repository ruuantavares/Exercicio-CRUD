import Cliente from "../model/cliente.js";

class ServiceCliente {
  async FindAll() {
    return Cliente.findAll();
  }

  async FindOne(id) {
    if (!id) {
      throw new Error("Favor informar um ID válido");
    }

    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      throw new Error(`Cliente ${id} não encontrado`);
    }

    return cliente;
  }

  async Create(nome, telefone) {
    if (!nome || !telefone) {
      throw new Error("Favor preencher todos os dados");
    }

    await Cliente.create({
      nome,
      telefone,
    });
  }

  async Update(id, nome, telefone) {
    if (!id) {
      throw new Error("Favor preencher todos os dados");
    }

    const clienteAntigo = await Cliente.findByPk(id);

    if (!clienteAntigo) {
      throw new Error("Cliente não encontrado");
    }
    clienteAntigo.nome = nome || clienteAntigo.nome;
    clienteAntigo.telefone = telefone || clienteAntigo.telefone;

    return clienteAntigo.save()
  }

  async Delete(id) {
    if (!id) {
      throw new Error("Favor informar um ID");
    }

    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      throw new Error(`Cliente ${id} não encontrado`);
    }

    return Cliente.destroy();
  }
}

export default new ServiceCliente();
