const express = require('express');
const router = express.Router();

const {checkRequestBodyParams,validateRequest,checkQuery,checkParam} = require("../../src/middleware/validate");
const {signUp,login} = require('../../src/controllers/userController');

const catch_error = fn => (req, res, next) => 
    Promise.resolve(fn(req, res, next)).catch(next);


router.post('/signUp', 
    validateRequest,
    checkRequestBodyParams("name"),
    checkRequestBodyParams("email"),
    checkRequestBodyParams("password"),
    catch_error(signUp)
);

router.post('/login', 
    validateRequest,
    checkRequestBodyParams("email"),
    checkRequestBodyParams("password"),
    catch_error(login)
);

module.exports = router;
