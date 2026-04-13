import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  const addOrUpdate = () => {
    if (!text) return;

    if (editId) {
      // Update existing item in the array
      setTodos(todos.map(t => (t._id === editId ? { ...t, text } : t)));
      setEditId(null);
    } else {
      // Add new item to the array (generate a random ID like MongoDB used to)
      setTodos([...todos, { _id: Date.now().toString(), text }]);
    }

    setText(""); // Clear input box
  };

  const deleteTodo = (id) => {
    // Remove item from the array
    setTodos(todos.filter((t) => t._id !== id));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Todo App</h2>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter task"
      />

      <button onClick={addOrUpdate}>
        {editId ? "Update" : "Add"}
      </button>

      <ul>
        {todos.map((t) => (
          <li key={t._id}>
            {t.text}

            <button onClick={() => deleteTodo(t._id)}>Delete</button>

            <button onClick={() => {
              setText(t.text);
              setEditId(t._id);
            }}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;