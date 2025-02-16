const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { LocalStorage } = require("node-localstorage");

const localStorage = new LocalStorage("./storage");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const TasksKey = "tasks";
const CategoriesKey = "categories";

function saveLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

// API to get categories
app.get("/categories", (req, res) => {
    const categories = loadFromLocalStorage(CategoriesKey);
    res.json(categories);
});

// API to add a category
app.post("/categories", (req, res) => {
    const categories = loadFromLocalStorage(CategoriesKey);
    const newCategory = req.body;
    categories.push(newCategory);
    saveLocalStorage(CategoriesKey, categories);
    res.status(201).json(newCategory);
});

// API to get tasks
app.get("/tasks", (req, res) => {
    const tasks = loadFromLocalStorage(TasksKey);
    res.json(tasks);
});

// API to add a task
app.post("/tasks", (req, res) => {
    const tasks = loadFromLocalStorage(TasksKey);
    const newTask = req.body;
    tasks.push(newTask);
    saveLocalStorage(TasksKey, tasks);
    res.status(201).json(newTask);
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
