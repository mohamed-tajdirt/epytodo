const express = require('express');
const router = express.Router();
const { getCurrentUser, getUserTodos, updateUser, deleteUser, getUserinfo} = require('./user.query');
const authToken = require('../../middleware/auth');
const badParameter = require('../../middleware/badparameter');

router.get('/user', authToken, getCurrentUser);
router.get('/user/todos', authToken, getUserTodos);
router.get('/users/:id', authToken, getUserinfo);
router.put('/users/:id', authToken, updateUser); // ?
router.delete('/users/:id', authToken, deleteUser); // ?

module.exports = router;
