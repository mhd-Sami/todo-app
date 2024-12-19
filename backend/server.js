// backend/server.js
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let tasks = []; 

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const { text } = req.body;
  const newTask = { id: tasks.length + 1, text, completed: false };
  tasks.push(newTask);
  res.json(newTask);
});

app.patch("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (task) {
    task.completed = !task.completed;
    res.json(task);
  } else {
    res.status(404).send("Task not found");
  }
});

app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
  res.send("Task deleted");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});




