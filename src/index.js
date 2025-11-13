import express from "express";
import routerCliente from "./router/cliente.js";
import routerPet from "./router/pet.js"
import bancoDados from "./config/database.js";

const app = express();

app.use(express.json());
app.use("/api/v1", routerCliente, routerPet);

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
