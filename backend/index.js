const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Makes all URLs accessible publicly

// In-memory database (replaces MongoDB)
let todos = [];
let nextId = 1;

// ADD
app.post("/add", (req, res) => {
    // Generate a new ID and create the todo
    // We use '_id' to match what MongoDB used, so your frontend doesn't break
    const todo = { _id: String(nextId++), text: req.body.text };
    todos.push(todo);
    res.send(todo);
});

// GET
app.get("/get", (req, res) => {
    res.json(todos);
});

// UPDATE
app.put("/update/:id", (req, res) => {
    const todo = todos.find(t => t._id === req.params.id);
    if (todo) {
        todo.text = req.body.text;
    }
    res.send("Updated");
});

// DELETE
app.delete("/delete/:id", (req, res) => {
    todos = todos.filter(t => t._id !== req.params.id);
    res.send("Deleted");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} (Database: In-Memory Array)`));