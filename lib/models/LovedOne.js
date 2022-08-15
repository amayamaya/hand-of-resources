const pool = require('../utils/pool');

class LovedOne {
  id;
  name;
  origin;
  connection;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.origin = row.origin;
    this.connection = row.connection;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
        SELECT * FROM loved_ones;
        `
    );
    return rows.map((row) => new LovedOne(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT * FROM loved_ones WHERE id = $1;
        `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new LovedOne(rows[0]);
  }

  static async insert({ name, origin, connection }) {
    const { rows } = await pool.query(
      `
        INSERT INTO loved_ones (name, origin, connection)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
      [name, origin, connection]
    );
    return new LovedOne(rows[0]);
  }
}
module.exports = { LovedOne };
