const express = require('express');
const router = express.Router();



const user = require('./userRouter');
const post = require('./postRouter');
const comment = require('./commentRouter');

router.use('/user', user);
router.use('/post', post);
router.use('/comment', comment);


module.exports = router;