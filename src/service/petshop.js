import Petshop from "../model/petshop.js";

class ServicePetshop {
  async FindAll() {
    return Petshop.findAll();
  }

  async FindOne(id) {
    if (!id) {
      throw new Error("Favor informar um ID válido");
    }

    const petshop = await Petshop.findByPk(id);

    if (!petshop) {
      throw new Error(`Cliente ${id} não encontrado`);
    }

    return petshop;
  }

  async Create(nome, telefone) {
    if (!nome || !telefone) {
      throw new Error("Favor preencher todos os dados");
    }

    await Petshop.create({
      nome,
      telefone,
    });
  }

  async Update(id, nome, telefone) {
    if (!id) {
      throw new Error("Favor preencher todos os dados");
    }

    const clienteAntigo = await Petshop.findByPk(id);

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

    const petshop = await Petshop.findByPk(id);

    if (!petshop) {
      throw new Error(`Cliente ${id} não encontrado`);
    }

    return petshop.destroy();
  }
}

export default new ServicePetshop();
