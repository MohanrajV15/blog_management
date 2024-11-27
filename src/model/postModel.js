const db = require("../database/db");

const postModel = {
  async createPost({ title, content, userId }) {
    const query = `
      INSERT INTO posts (title, content, user_id) 
      VALUES (?, ?, ?)
    `;
    const [result] = await db.execute(query, [title, content, userId]);
    return result.insertId; 
  },

  async getAllPosts(limit = 10, offset = 0, search = '') {
      const query = `
        SELECT * 
        FROM posts 
        WHERE title LIKE ? OR content LIKE ? 
        ORDER BY created_at DESC 
        LIMIT ? OFFSET ?
      `;
        const searchPattern = `%${search}%`;
      const parsedLimit = parseInt(limit, 10);
      const parsedOffset = parseInt(offset, 10);
  
      const [rows] = await db.query(query, [searchPattern, searchPattern, parsedLimit, parsedOffset]);
      return rows;
  },
  
  

  async getTotalPosts(search) {
    console.log(search);
    
    const query = `
      SELECT COUNT(*) as total 
      FROM posts 
      WHERE title LIKE ? OR content LIKE ?
    `;
    const searchPattern = `%${search}%`;
    const [rows] = await db.execute(query, [searchPattern, searchPattern]);
    return rows[0];
  },

  async getPostById(id) {
    const query = `
      SELECT * 
      FROM posts 
      WHERE id = ?
    `;
    const [rows] = await db.execute(query, [id]);
    return rows[0];
  },


  async updatePost(id, title, content, userId) {
    
      const query = `
        UPDATE posts 
        SET title = ?, content = ?, updated_at = NOW() 
        WHERE id = ? AND user_id = ?
      `;
      const [result] = await db.execute(query, [title, content, id, userId]);

      if (result.affectedRows > 0) {
        return { success: true, message: "Post updated successfully!" };
      } else{
      return { success: false, message: "Post not found!" };
      }
  },
  

  async deletePost(id, userId) {
    const query = `
      DELETE FROM posts 
      WHERE id = ? AND user_id = ?
    `;
    const [result] = await db.execute(query, [id, userId]);
    return result.affectedRows > 0; 
  }
};

module.exports = postModel;


