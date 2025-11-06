# CRUD

npm init
npm i --save-dev jest cross-env
npm i express jest
=================================================================================================
no package.json
    "type": "module",

    "dev": "node --watch ./src/index.js",
    "test": "cross-env TEST=true node --experimental-vm-modules node_modules/jest/bin/jest.js"
=================================================================================================
estruturar pastas
    src
        config
            database.js
        controller
            users.js
        model
            users.js
        router
            users.js
        service
            users.js
        index.js
=================================================================================================
Quem o index chama?
-router
Quem router chama?
-controller
Quem controller chama?
-service
Quem service chama ?
-model
Depois criar o database.js na pasta config

================================================================================================

//começa no model
    porem precisa criar o banco

//depois pro database da pasta config
    e configurar o banco com sequelize

//retorna para model
    e configura o banco

//depois ir para o index



===============================================================================================
no index.js

import express from "express";
import router from "./router/petshop.js";
import bancoDados from "./config/database.js";

const app = express();

app.use(express.json());
app.use("/api/v1", router);

const port = 3000;
bancoDados.db
  .sync({ force: false })
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((e) => {
    console.log("Não foi possivel conectar com o banco:" + e);
  });


=================================================================================================
no router     
    //objetivo da rota é disponibilizar o endpoint
    import express from "express";
    import ControllerPetshop from "../controller/petshop.js";

    const router = express.Router();

    router.get("/clientes", ControllerPetshop.FindAll);
    router.get("/cliente/:id", ControllerPetshop.FindOne);
    router.post("/cliente", ControllerPetshop.Create);
    router.put("/cliente/:id", ControllerPetshop.Update);
    router.delete("/cliente/:id", ControllerPetshop.Delete);

    export default router;

===================================================================================================
no controller    

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

===================================================================================================
no service

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

===================================================================================================

no postman
    My collection
        + blank collection
            REST API basic
                GET FindAll localhost:3000/api/v1/clientes
                GET FindOne localhost:3000/api/v1/cliente/1
                POST Create localhost:3000/api/v1/cliente
                PUT Update localhost:3000/api/v1/cliente/1
                DEL Delete localhost:3000/api/v1/cliente/1

após novas funções e rotas definidas, testar novamente, npm run dev e no postman localhost:3000/api/v1/cliente/qualquercoisa      //quando tiver ':', no endpoint usar '&'
===================================================================================================
