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

  static async getById(id) {
    const { rows } = await pool.query(
      `
            SELECT * FROM candles WHERE id = $1;
            `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Candle(rows[0]);
  }

  static async insert({ name, scent, color }) {
    const { rows } = await pool.query(
      `
            INSERT INTO candles (name, scent, color)
            VALUES ($1, $2, $3)
            RETURNING *
            `,
      [name, scent, color]
    );
    return new Candle(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const candle = await Candle.getById(id);
    if (!candle) return null;
    const updatedData = { ...candle, ...newAttrs };
    const { rows } = await pool.query(
      `
            UPDATE candles
            SET name = $2, scent = $3, color = $4
            WHERE id = $1
            RETURNING *;
            `,
      [id, updatedData.name, updatedData.scent, updatedData.color]
    );
    return new Candle(rows[0]);
  }
}
module.exports = { Candle };
