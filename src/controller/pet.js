import ServicePet from "../service/pet.js";

class ControllerPet {
  async FindAll(req, res) {
    try {
      const pet = await ServicePet.FindAll();
      res.status(200).send({
        data: pet,
      });
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  }

  async FindOne(req, res) {
    try {
      const id = req.params.id;
      const pet = await ServicePet.FindOne(id);

      res.status(200).send({ data: pet });
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  }

  async Create(req, res) {
    try {
      const { nome, raca, tutor } = req.body;

      await ServicePet.Create(nome, raca, tutor);
      res.status(201).send({ msg: "Cadastro de Pet novo criado" });
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  }

  async Update(req, res) {
    try {
      const id = req.params.id;
      const nome = req.body?.nome;
      const raca = req.body?.raca;
      const tutor = req.body?.tutor

      ServicePet.Update(id, nome, raca, tutor);

      res.status(200).send({ msg: "Dados atualizados!" });
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  }

  async Delete(req, res) {
    try {
      const id = req.params.id;

      await ServicePet.Delete(id);

      res.status(204).send();
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  }
}

export default new ControllerPet();
