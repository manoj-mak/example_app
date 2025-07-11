const express = require('express');
const TodoController = require('../controllers/todoController');

const router = express.Router();

// GET /api/todos - Get all todos
router.get('/', TodoController.getAllTodos);

// GET /api/todos/:id - Get a specific todo
router.get('/:id', TodoController.getTodoById);

// POST /api/todos - Create a new todo
router.post('/', TodoController.createTodo);

// PUT /api/todos/:id - Update a todo
router.put('/:id', TodoController.updateTodo);

// PATCH /api/todos/:id/toggle - Toggle todo completion status
router.patch('/:id/toggle', TodoController.toggleTodo);

// DELETE /api/todos/:id - Delete a todo
router.delete('/:id', TodoController.deleteTodo);

module.exports = router; 