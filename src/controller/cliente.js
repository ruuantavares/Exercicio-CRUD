import ServiceCliente from "../service/cliente.js";

class ControllerCliente {
  async FindAll(req, res) {
    try {
      const cliente = await ServiceCliente.FindAll();
      res.status(200).send({
        data: cliente,
      });
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  }

  async FindOne(req, res) {
    try {
      const id = req.params.id;
      const cliente = await ServiceCliente.FindOne(id);

      res.status(200).send({ data: cliente });
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  }

  async Create(req, res) {
    try {
      const { nome, telefone } = req.body;

      await ServiceCliente.Create(nome, telefone);
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

      ServiceCliente.Update(id, nome, telefone);

      res.status(200).send({ msg: "Dados atualizados!" });
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  }

  async Delete(req, res) {
    try {
      const id = req.params.id;

      await ServiceCliente.Delete(id);

      res.status(204).send();
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  }
}

export default new ControllerCliente();
