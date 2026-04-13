const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// 👉 USE ATLAS URL for deployment
mongoose.connect("YOUR_MONGODB_ATLAS_URL")
.then(()=>console.log("DB Connected"))
.catch(err=>console.log(err));

const Todo = require("./models/todo");

// ADD
app.post("/add", async (req,res)=>{
  const todo = new Todo({ text: req.body.text });
  await todo.save();
  res.send(todo);
});

// GET
app.get("/get", async (req,res)=>{
  const data = await Todo.find();
  res.json(data);
});

// UPDATE
app.put("/update/:id", async (req,res)=>{
  await Todo.findByIdAndUpdate(req.params.id, { text: req.body.text });
  res.send("Updated");
});

// DELETE
app.delete("/delete/:id", async (req,res)=>{
  await Todo.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

app.listen(5000, ()=>console.log("Server running"));