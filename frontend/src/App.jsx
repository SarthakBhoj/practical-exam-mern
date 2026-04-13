import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "https://your-backend-url.onrender.com"; // 🔥 CHANGE THIS AFTER DEPLOY

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchTodos = async () => {
    const res = await axios.get(`${API}/get`);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addOrUpdate = async () => {
    if (!text) return;

    if (editId) {
      await axios.put(`${API}/update/${editId}`, { text });
      setEditId(null);
    } else {
      await axios.post(`${API}/add`, { text });
    }

    setText("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/delete/${id}`);
    fetchTodos();
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