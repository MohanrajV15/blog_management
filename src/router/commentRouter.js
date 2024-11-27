const express = require('express');
const router = express.Router();

const {checkRequestBodyParams,validateRequest,checkQuery,checkParam} = require("../../src/middleware/validate");
const {checkSession} = require("../../src/middleware/checkAuth");

const {createComment,getCommentsByPostId} = require('../../src/controllers/commentController');

const catch_error = fn => (req, res, next) => 
    Promise.resolve(fn(req, res, next)).catch(next);



router.post('/',
    validateRequest,
    checkSession,
    checkRequestBodyParams("postId"),
    checkRequestBodyParams("commentText"),
    catch_error(createComment)
   );

router.get('/',
    checkSession,
    checkQuery("postId"),
    catch_error(getCommentsByPostId)
);


module.exports = router;