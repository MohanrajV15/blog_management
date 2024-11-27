const db = require('../database/db');

const userModel = {
  async createUser({ name, email, password }) {
    const query = `
      INSERT INTO users (name, email, password) 
      VALUES (?, ?, ?)
    `;
    const [result] = await db.execute(query, [name, email, password]);
    return result.insertId; 
  },

  async findUser(email) {
    const query = `
      SELECT * FROM users WHERE email = ?
    `;
    const [rows] = await db.execute(query, [email]);
    return rows[0]; 
  }
};

module.exports = userModel;
