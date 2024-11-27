const postModel = require('../../src/model/postModel');
const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const userId = req.userId;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title, content,  are required.',
      });
    }
    const newPost = await postModel.createPost({ title, content, userId });
    if (!newPost) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create post.',
      });
    }
    return res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: newPost,
    });
  } catch (err) {
    console.log('Error creating post:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.body;

    if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Page and limit enter for positive numbers.',
      });
    }
    const offset = (page - 1) * limit;
   
    
    
    const posts = await postModel.getAllPosts(limit, offset, search);
    console.log(posts);
    const total = await postModel.getTotalPosts(search);
    
    

    if (!posts || posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No posts found.',
      });
    }
    res.status(200).json({
      success: true,
      data: posts,
      total,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.log('Error fetching posts:', err.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};




const getPostById = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Post ID (id) is required.',
      });
    }

    const post = await postModel.getPostById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found.',
      });
    }
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    console.log('Error fetching post', err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch post.',
    });
  }
};

const updatePost = async (req, res, next) => {
  try {
        const {id, title, content } = req.body;
        const userId = req.userId;
        
    if ( !id || !userId) {
      return res.status(400).json({
        success: false,
        message: 'id, userId are required.',
      });
    }

    const result = await postModel.updatePost(id, title, content, userId);
    console.log(result);
    
    if (!result || result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Post not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Post updated successfully.',
    });
  } catch (err) {
    console.log('Error updating post:', err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to update post.',
    });
  }
};


const deletePost = async (req, res, next) => {
  try {
    const { id } = req.query;
    const userId = req.userId;
    if (!id || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Post ID and UserId is required.',
      });
    }

    const result = await postModel.deletePost(id,userId);
    if (!result || result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Post not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully.',
    });
  } catch (err) {
    console.log('Error deleting post:', err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to delete post.',
    });
  }
};


module.exports ={
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost}