const commentModel = require("../../src/model/commentModel");

const createComment = async (req, res, next) => {
  try {
    const { postId, commentText } = req.body;
    const userId = req.userId;
  
    if (!postId || !commentText || !userId) {
      return res.status(400).json({ error: 'Post ID and userId and comment text are required' });
    }

    const result = await commentModel.createComment({ postId, userId, commentText });
    
    if (result) {
      return res.status(201).json({ message: 'Comment added successfully' }); 
    }

    return res.status(500).json({ error: 'Failed to add comment' });
  } catch (err) {
    console.error('Error creating comment:', err);
    next(err);
  }
};

const getCommentsByPostId = async (req, res, next) => {
  try {
    const { postId } = req.query;
    if (!postId) {
      return res.status(400).json({ error: 'Post ID is required' });
    }
    const comments = await commentModel.getCommentsByPostId(postId);
    if (!comments || comments.length === 0) {
      return res.status(404).json({ message: 'No comments found for this post' });
    }
    return res.status(200).json({ data: comments });
  } catch (err) {
    console.error('Error fetching comments:', err);
    next(err);
  }
};


module.exports = {
    createComment,
    getCommentsByPostId
};
