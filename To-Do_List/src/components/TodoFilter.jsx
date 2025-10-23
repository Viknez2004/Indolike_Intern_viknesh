import React from 'react';

const TodoFilter = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' }
  ];

  return (
    <div className="flex gap-2 mb-4 p-1 bg-gray-100 rounded-lg">
      {filters.map(filter => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
            currentFilter === filter.key
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default TodoFilter;