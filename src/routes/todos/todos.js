const express = require('express');
const router = express.Router();
const { getTodos, getTodosById, postTodos, updateTodos, deleteTodos } = require('./todos.query');
const authToken = require('../../middleware/auth');
const badParameter = require('../../middleware/badparameter');

router.get('/todos', authToken, getTodos);
router.get('/todos/:id', authToken, getTodosById);
router.post('/todos', authToken, badParameter, postTodos); // ??
router.put('/todos/:id', authToken, badParameter, updateTodos); // ???
router.delete('/todos/:id', authToken, deleteTodos); // ??


module.exports = router;
