const pool = require('../utils/pool');

class BalconyPlant {
  id;
  name;
  origin;
  features;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.origin = row.origin;
    this.features = row.features;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
        SELECT * FROM balcony_plants;
        `
    );
    return rows.map((row) => new BalconyPlant(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT * FROM balcony_plants WHERE id = $1;
        `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new BalconyPlant(rows[0]);
  }
}
module.exports = { BalconyPlant };
