import Pet from "../model/pet.js";

class ServicePet {
  async FindAll() {
    return Pet.findAll(); //{include} pesquisar na lib do sequelizee
  }

  async FindOne(id) {
    if (!id) {
      throw new Error("Favor informar um ID válido");
    }

    const pet = await Pet.findByPk(id);

    if (!pet) {
      throw new Error(`Pet ${id} não encontrado`);
    }

    return pet;
  }

  async Create(nome, raca, tutor) {
    if (!nome || !raca || !tutor) {
      throw new Error("Favor preencher todos os dados");
    }

    await Pet.create({
      nome,
      raca,
      tutor
    });
  }

  async Update(id, nome, raca, tutor) {
    if (!id) {
      throw new Error("Favor preencher todos os dados");
    }

    const petAntigo = await Pet.findByPk(id);

    if (!petAntigo) {
      throw new Error("Pet não encontrado");
    }
    petAntigo.nome = nome || petAntigo.nome;
    petAntigo.raca = raca || petAntigo.raca;
    petAntigo.tutor = tutor || petAntigo.tutor

    return petAntigo.save()
  }

  async Delete(id) {
    if (!id) {
      throw new Error("Favor informar um ID");
    }

    const pet = await Pet.findByPk(id);

    if (!pet) {
      throw new Error(`Pet ${id} não encontrado`);
    }

    return Pet.destroy();
  }
}

export default new ServicePet();
