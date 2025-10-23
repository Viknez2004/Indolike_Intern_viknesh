import React, { useState } from 'react';

const TodoItem = ({ todo, onToggle, onDelete, onEdit, onStartEdit, onCancelEdit, isEditing }) => {
  const [editText, setEditText] = useState(todo.text);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
    } else {
      onCancelEdit();
    }
  };

  const handleEditCancel = () => {
    setEditText(todo.text);
    onCancelEdit();
  };

  const handleStartEdit = () => {
    setEditText(todo.text);
    onStartEdit(todo.id);
  };

  if (isEditing) {
    return (
      <form onSubmit={handleEditSubmit} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          autoFocus
        />
        <button
          type="submit"
          className="px-3 py-2 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600 transition-colors"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleEditCancel}
          className="px-3 py-2 bg-gray-500 text-white text-sm font-medium rounded hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
      </form>
    );
  }

  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${
      todo.completed 
        ? 'bg-gray-50 border-gray-200' 
        : 'bg-white border-gray-300 hover:border-blue-300'
    }`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-5 w-5 text-blue-500 rounded focus:ring-blue-400"
      />
      
      <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
        {todo.text}
      </span>
      
      <div className="flex gap-2">
        <button
          onClick={handleStartEdit}
          className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;