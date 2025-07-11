const TodoStore = require('../data/todoStore');

class TodoController {
  // Get all todos
  static async getAllTodos(req, res) {
    try {
      const todos = TodoStore.getAllTodos();
      res.status(200).json({
        success: true,
        data: todos,
        count: todos.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch todos'
      });
    }
  }

  // Get a single todo by ID
  static async getTodoById(req, res) {
    try {
      const { id } = req.params;
      const todo = TodoStore.getTodoById(parseInt(id));
      
      if (!todo) {
        return res.status(404).json({
          success: false,
          error: 'Todo not found'
        });
      }

      res.status(200).json({
        success: true,
        data: todo
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch todo'
      });
    }
  }

  // Create a new todo
  static async createTodo(req, res) {
    try {
      const { text } = req.body;
      
      if (!text || text.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Todo text is required'
        });
      }

      const newTodo = TodoStore.createTodo(text.trim());
      
      res.status(201).json({
        success: true,
        data: newTodo
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to create todo'
      });
    }
  }

  // Update a todo
  static async updateTodo(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const updatedTodo = TodoStore.updateTodo(parseInt(id), updates);
      
      if (!updatedTodo) {
        return res.status(404).json({
          success: false,
          error: 'Todo not found'
        });
      }

      res.status(200).json({
        success: true,
        data: updatedTodo
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to update todo'
      });
    }
  }

  // Toggle todo completion status
  static async toggleTodo(req, res) {
    try {
      const { id } = req.params;
      const toggledTodo = TodoStore.toggleTodo(parseInt(id));
      
      if (!toggledTodo) {
        return res.status(404).json({
          success: false,
          error: 'Todo not found'
        });
      }

      res.status(200).json({
        success: true,
        data: toggledTodo
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to toggle todo'
      });
    }
  }

  // Delete a todo
  static async deleteTodo(req, res) {
    try {
      const { id } = req.params;
      const deleted = TodoStore.deleteTodo(parseInt(id));
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'Todo not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Todo deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to delete todo'
      });
    }
  }
}

module.exports = TodoController; 