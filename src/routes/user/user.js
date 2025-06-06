const express = require('express');
const router = express.Router();
const { getCurrentUser, getUserTodos, updateUser, deleteUser, getUserinfo } = require('./user.query');
const authToken = require('../../middleware/auth');
const badParameter = require('../../middleware/badparameter');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management and profile operations
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get current logged-in user info
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                 firstname:
 *                   type: string
 *                 name:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
router.get('/user', authToken, getCurrentUser);

/**
 * @swagger
 * /user/todos:
 *   get:
 *     summary: Get todos for the current user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       401:
 *         description: Unauthorized
 */
router.get('/user/todos', authToken, getUserTodos);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get info of a user by ID or email
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID or email
 *     responses:
 *       200:
 *         description: User found
 *       400:
 *         description: Bad parameter
 *       404:
 *         description: User not found
 */
router.get('/users/:id', authToken, getUserinfo);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user info
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *               - firstname
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               firstname:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *       400:
 *         description: Bad parameters
 *       404:
 *         description: Not found
 */
router.put('/users/:id', authToken, badParameter, updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: User not found
 */
router.delete('/users/:id', authToken, deleteUser);

module.exports = router;
