const pool = require('../utils/pool');

class OfficePlant {
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
        SELECT * FROM office_plants;
        `
    );
    return rows.map((row) => new OfficePlant(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT * FROM office_plants WHERE id = $1;
        `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new OfficePlant(rows[0]);
  }

  static async insert({ name, origin, features }) {
    const { rows } = await pool.query(
      `
        INSERT INTO office_plants (name, origin, features)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
      [name, origin, features]
    );
    return new OfficePlant(rows[0]);
  }
  
  static async updateById(id, newAttrs) {
    const officeplant = await OfficePlant.getById(id);
    if (!officeplant) return null;
    const updatedData = { ...officeplant, ...newAttrs };
    const { rows } = await pool.query(
      `
        UPDATE office_plants
        SET name = $2, origin = $3, features = $4
        WHERE id = $1
        RETURNING *;
        `,
      [id, updatedData.name, updatedData.origin, updatedData.features]
    );
    return new OfficePlant(rows[0]);
  }
  static async deleteById(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM office_plants WHERE id = $1
        RETURNING *;
        `,
      [id]
    );
    return new OfficePlant(rows[0]);
  }
}
module.exports = { OfficePlant };
