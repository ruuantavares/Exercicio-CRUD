import BancoDados from "../config/database.js";

class Cliente {
  constructor() {
    this.model = BancoDados.db.define("clientes", {
      id: {
        type: BancoDados.db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: BancoDados.db.Sequelize.STRING,
      },
      telefone: {
        type: BancoDados.db.Sequelize.STRING,
        unique: true,
      },
    });
  }
}
export default new Cliente().model;
