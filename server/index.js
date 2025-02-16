
async function fetchCategories() {
    const res = await fetch('http://localhost:4800/categories');
    const categories = await res.json();
    const list = document.getElementById("category-list");
    list.innerHTML = "";
    categories.forEach(cat => {
        const li = document.createElement("li");
        li.textContent = cat.name;
        list.appendChild(li);
    });
}

async function fetchTasks() {
    const res = await fetch('http://localhost:4800/tasks');
    const tasks = await res.json();
    const list = document.getElementById("task-list");
    list.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = `${task.name} - ${task.category}`;
        list.appendChild(li);
    });
}

async function addCategory() {
    const categoryName = document.getElementById("category-input").value;
    if (!categoryName) return;
    await fetch('http://localhost:4800/categories', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Date.now(), name: categoryName })
    });
    fetchCategories();
}

async function addTask() {
    const taskName = document.getElementById("task-input").value;
    const taskCategory = document.getElementById("task-category").value;
    if (!taskName || !taskCategory) return;
    await fetch('http://localhost:4800/tasks', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Date.now(), name: taskName, category: taskCategory })
    });
    fetchTasks();
}

fetchCategories();
fetchTasks();
