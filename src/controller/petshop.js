import ServicePetshop from "../service/petshop.js";

class ControllerPetshop {
  async FindAll(req, res) {
    try {
      const petshop = await ServicePetshop.FindAll();
      res.status(200).send({
        data: petshop,
      });
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  }

  async FindOne(req, res) {
    try {
      const id = req.params.id;
      const petshop = await ServicePetshop.FindOne(id);

      res.status(200).send({ data: petshop });
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  }

  async Create(req, res) {
    try {
      const { nome, telefone } = req.body;

      await ServicePetshop.Create(nome, telefone);
      res.status(201).send({ msg: "Cliente novo criado" });
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  }

  async Update(req, res) {
    try {
      const id = req.params.id;
      const nome = req.body?.nome;
      const telefone = req.body?.telefone;

      ServicePetshop.Update(id, nome, telefone);

      res.status(200).send({ msg: "Dados atualizados!" });
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  }

  async Delete(req, res) {
    try {
      const id = req.params.id;

      await ServicePetshop.Delete(id);

      res.status(204).send();
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  }
}

export default new ControllerPetshop();
