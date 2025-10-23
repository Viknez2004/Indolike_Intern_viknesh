import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import TodoFilter from './components/TodoFilter';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Todo List</h1>
          <p className="text-gray-600">Stay organized and productive</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <TodoForm onAdd={addTodo} />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{activeCount} active</span>
              <span className="mx-2">•</span>
              <span className="font-medium">{completedCount} completed</span>
            </div>
            {completedCount > 0 && (
              <button
                onClick={clearCompleted}
                className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
              >
                Clear Completed
              </button>
            )}
          </div>

          <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
          
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />

          {todos.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-500 mb-2">
                No todos yet
              </h3>
              <p className="text-gray-400">
                Add a todo above to get started!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;