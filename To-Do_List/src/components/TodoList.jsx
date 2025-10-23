import React, { useState } from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (id, text) => {
    onEdit(id, text);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="space-y-2">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={handleEdit}
          onStartEdit={setEditingId}
          onCancelEdit={handleCancelEdit}
          isEditing={editingId === todo.id}
        />
      ))}
    </div>
  );
};

export default TodoList;