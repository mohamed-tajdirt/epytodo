const express = require('express');
const router = express.Router();
const { getCurrentUser, getUserTodos, updateUser, deleteUser, getUserById, getUserByEmail} = require('./user.query');
const authToken = require('../../middleware/auth');
const badParameter = require('../../middleware/badparameter');

router.get('/user', authToken, getCurrentUser);
router.get('/user/todos', authToken, getUserTodos);
// router.get('/users/:email', authToken, getUserByEmail);
router.get('/users/:id', authToken, getUserById);
router.put('/users/:id', authToken, updateUser); // ?
router.delete('/users/:id', authToken, deleteUser); // ?

module.exports = router;
