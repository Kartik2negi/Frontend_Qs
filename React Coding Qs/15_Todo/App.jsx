import React, { useState } from 'react';
import './style.css';

const Todo = () => {
  const [input, setInput] = useState('');
  const [todo, setTodo] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleAddTodo = () => {
    // EDIT LOGIC
    if (editId) {
      setTodo((prev) =>
        prev.map((el) =>
          el.id === editId
            ? {
                ...el,
                value: input,
              }
            : el
        )
      );

      setEditId(null);
    } else {
      // ADD LOGIC
      const newObj = {
        id: Date.now(),
        value: input,
      };

      setTodo((prev) => [...prev, newObj]);
    }

    setInput('');
  };

  const handleDelete = (id) => {
    setTodo((prev) => prev.filter((el) => el.id !== id));

    // optional: clear edit mode if deleting edited item
    if (editId === id) {
      setEditId(null);
      setInput('');
    }
  };

  return (
    <div>
      <div>
        <input
          placeholder="Enter your todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button disabled={input === ''} onClick={handleAddTodo}>
          {editId ? 'Update' : 'Add'}
        </button>
      </div>

      {todo.length > 0 &&
        todo.map((el) => {
          return (
            <li key={el.id}>
              {el.value}

              <button
                onClick={() => {
                  setInput(el.value);
                  setEditId(el.id);
                }}
              >
                Edit
              </button>

              <button onClick={() => handleDelete(el.id)}>Delete</button>
            </li>
          );
        })}
    </div>
  );
};

export default function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <Todo />
    </div>
  );
}
