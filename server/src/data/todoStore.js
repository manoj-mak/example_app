const Todo = require('../models/Todo');

// In-memory storage (in a real app, this would be a database)
let todos = [
  new Todo(1, 'Learn React', false),
  new Todo(2, 'Build a Todo List', false),
  new Todo(3, 'Profit!', false),
];

let nextId = 4;

class TodoStore {
  static getAllTodos() {
    return todos.map(todo => todo.toJSON());
  }

  static getTodoById(id) {
    const todo = todos.find(todo => todo.id === id);
    return todo ? todo.toJSON() : null;
  }

  static createTodo(text) {
    const newTodo = new Todo(nextId++, text, false);
    todos.push(newTodo);
    return newTodo.toJSON();
  }

  static updateTodo(id, updates) {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      return null;
    }
    
    const updatedTodo = todos[todoIndex].update(updates);
    return updatedTodo.toJSON();
  }

  static deleteTodo(id) {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      return false;
    }
    
    todos.splice(todoIndex, 1);
    return true;
  }

  static toggleTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    if (!todo) {
      return null;
    }
    
    todo.completed = !todo.completed;
    todo.updatedAt = new Date();
    return todo.toJSON();
  }
}

module.exports = TodoStore; 