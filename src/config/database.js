import { Sequelize } from "sequelize";

class BancoDados {
  constructor() {
    this.init();
  }

  init() {
    this.db = new Sequelize({
      database: "petshop",
      host: "localhost",
      username: "root",
      password: "",
      dialect: "mysql",
    });
  }
}

export default new BancoDados();
