import React, { useState, useEffect } from 'react';
import { todoService } from '../services/todoService';
import type { Todo } from '../services/todoService';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTodoText, setNewTodoText] = useState('');

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTodos = await todoService.getAllTodos();
      setTodos(fetchedTodos);
    } catch (err) {
      setError('Failed to fetch todos');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (id: number) => {
    try {
      const updatedTodo = await todoService.toggleTodo(id);
      setTodos(todos =>
        todos.map(todo =>
          todo.id === id ? updatedTodo : todo
        )
      );
    } catch (err) {
      setError('Failed to toggle todo');
      console.error('Error toggling todo:', err);
    }
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;

    try {
      const newTodo = await todoService.createTodo(newTodoText.trim());
      setTodos([...todos, newTodo]);
      setNewTodoText('');
    } catch (err) {
      setError('Failed to add todo');
      console.error('Error adding todo:', err);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
      console.error('Error deleting todo:', err);
    }
  };

  if (loading) {
    return <div>Loading todos...</div>;
  }

  return (
    <div>
      <h2>Todo List</h2>
      
      {error && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          {error}
          <button onClick={fetchTodos} style={{ marginLeft: '1rem' }}>
            Retry
          </button>
        </div>
      )}

      <form onSubmit={addTodo} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new todo..."
          style={{ marginRight: '0.5rem', padding: '0.5rem' }}
        />
        <button type="submit">Add Todo</button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li 
            key={todo.id} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '0.5rem 0',
              borderBottom: '1px solid #eee'
            }}
          >
            <label style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{ marginRight: '0.5rem' }}
              />
              <span style={{ 
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#888' : 'inherit'
              }}>
                {todo.text}
              </span>
            </label>
            <button 
              onClick={() => deleteTodo(todo.id)}
              style={{ 
                background: 'red', 
                color: 'white', 
                border: 'none', 
                padding: '0.25rem 0.5rem',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && !loading && (
        <p>No todos yet. Add one above!</p>
      )}
    </div>
  );
};

export default TodoList;
