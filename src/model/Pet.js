import BancoDados from "../config/database.js";

class Pet {
  constructor() {
    this.model = BancoDados.db.define("Pets", {
      id: {
        type: BancoDados.db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: BancoDados.db.Sequelize.STRING,
      },
      raca: {
        type: BancoDados.db.Sequelize.STRING
      },
      tutor: {
        type:BancoDados.db.Sequelize.INTEGER
      }
    });
  }
}
export default new Pet().model;
