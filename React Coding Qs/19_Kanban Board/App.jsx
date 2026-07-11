import React, { useState } from 'react';

export default function App() {
  const [board, setBoard] = useState({
    todo: [
      { id: 1, title: 'Learn React' },
      { id: 2, title: 'Learn JavaScript' },
    ],
    progress: [{ id: 3, title: 'Machine Coding' }],
    done: [{ id: 4, title: 'Revise Interview Questions' }],
  });

  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (task, sourceColumn) => {
    setDraggedItem({
      task,
      sourceColumn,
    });
  };

  const handleDrop = (destinationColumn) => {
    if (!draggedItem) return;

    const { task, sourceColumn } = draggedItem;

    if (sourceColumn === destinationColumn) return;

    const updatedBoard = { ...board };

    // Remove from source column
    updatedBoard[sourceColumn] = updatedBoard[sourceColumn].filter(
      (item) => item.id !== task.id
    );

    // Add to destination column
    updatedBoard[destinationColumn] = [
      ...updatedBoard[destinationColumn],
      task,
    ];

    setBoard(updatedBoard);
    setDraggedItem(null);
  };

  const columns = [
    { key: 'todo', title: 'Todo' },
    { key: 'progress', title: 'In Progress' },
    { key: 'done', title: 'Done' },
  ];

  return (
    <div
      style={{
        padding: '30px',
        fontFamily: 'Arial',
        background: '#f5f5f5',
        minHeight: '100vh',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
        Kanban Board
      </h2>

      <div
        style={{
          display: 'flex',
          gap: '20px',
        }}
      >
        {columns.map((column) => (
          <div
            key={column.key}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(column.key)}
            style={{
              flex: 1,
              background: '#fff',
              borderRadius: '8px',
              padding: '15px',
              minHeight: '400px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <h3 style={{ textAlign: 'center' }}>{column.title}</h3>

            {board[column.key].map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={() => handleDragStart(task, column.key)}
                style={{
                  background: '#e3f2fd',
                  padding: '12px',
                  marginBottom: '10px',
                  borderRadius: '6px',
                  cursor: 'grab',
                  userSelect: 'none',
                }}
              >
                {task.title}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
