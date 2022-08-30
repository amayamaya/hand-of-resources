const pool = require('../utils/pool');

class Candle {
  id;
  name;
  scent;
  color;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.scent = row.scent;
    this.color = row.color;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
            SELECT * FROM candles;
            `
    );
    return rows.map((row) => new Candle(row));
  }
}
module.exports = { Candle };
