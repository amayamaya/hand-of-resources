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

  static async insert({ name, origin, features }) {
    const { rows } = await pool.query(
      `
        INSERT INTO balcony_plants (name, origin, features)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
      [name, origin, features]
    );
    return new BalconyPlant(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const balconyplant = await BalconyPlant.getById(id);
    if (!balconyplant) return null;
    const updatedData = { ...balconyplant, ...newAttrs };
    const { rows } = await pool.query(
      `
        UPDATE balcony_plants
        SET name = $2, origin = $3, features = $4
        WHERE id = $1
        RETURNING *;
        `,
      [id, updatedData.name, updatedData.origin, updatedData.features]
    );
    return new BalconyPlant(rows[0]);
  }
  static async deleteById(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM balcony_plants WHERE id = $1
        RETURNING *;
        `,
      [id]
    );
    return new BalconyPlant(rows[0]);
  }
}
module.exports = { BalconyPlant };
