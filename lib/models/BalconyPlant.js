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
}
module.exports = { BalconyPlant };
