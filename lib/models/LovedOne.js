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
}
module.exports = { LovedOne };
