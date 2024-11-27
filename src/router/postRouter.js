const express = require('express');
const router = express.Router();

const {checkRequestBodyParams,validateRequest,checkQuery,checkParam} = require("../../src/middleware/validate");
const {checkSession} = require("../../src/middleware/checkAuth");



const {createPost,getAllPosts,getPostById,updatePost,deletePost} = require('../controllers/postController');

const catch_error = fn => (req, res, next) => 
    Promise.resolve(fn(req, res, next)).catch(next);


router.post('/', 
    validateRequest,
    checkSession,
    checkRequestBodyParams("title"),
    checkRequestBodyParams("content"),
    catch_error(createPost)
);
router.get('/',
    checkSession,

    catch_error(getAllPosts)
   
);
router.get('/singlePost',
    checkSession,
    checkQuery("id"),
    catch_error(getPostById)
    );

  
router.put('/',
    checkSession,
    validateRequest,
    catch_error(updatePost)

);
router.delete('/', 
    checkSession,
    checkQuery("id"),
    catch_error(deletePost)
);

module.exports = router;
