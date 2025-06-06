const express = require('express');
const router = express.Router();
const { getTodos, getTodosById, postTodos, updateTodos, deleteTodos } = require('./todos.query');
const authToken = require('../../middleware/auth');
const badParameter = require('../../middleware/badparameter');

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         due_time:
 *           type: string
 *           format: date-time
 *         user_id:
 *           type: integer
 *         status:
 *           type: string
 *     TodoInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - due_time
 *         - user_id
 *         - status
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         due_time:
 *           type: string
 *           format: date-time
 *         user_id:
 *           type: integer
 *         status:
 *           type: string
 */

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get a todo by ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoInput'
 *     responses:
 *       201:
 *         description: Todo created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Bad parameter
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update a todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoInput'
 *     responses:
 *       201:
 *         description: Todo updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Bad parameter
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /todos/{id}:
 *  delete:
 *     summary: Delete a todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */

router.get('/todos', authToken, getTodos);
router.get('/todos/:id', authToken, getTodosById);
router.post('/todos', authToken, badParameter, postTodos);
router.put('/todos/:id', authToken, badParameter, updateTodos);
router.delete('/todos/:id', authToken, deleteTodos);

module.exports = router;