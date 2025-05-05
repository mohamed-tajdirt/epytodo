const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('./auth.query');
const badParameter = require("../../middleware/badparameter")

router.post('/register', badParameter, registerUser);
router.post('/login', badParameter, loginUser);

module.exports = router;