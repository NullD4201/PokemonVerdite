const tasks = [...document.querySelectorAll(".task-list [data-status]")];
const completed = tasks.filter(task => task.dataset.status === "done").length;
const active = tasks.filter(task => task.dataset.status === "active").length;
const planned = tasks.filter(task => task.dataset.status === "planned").length;
const percent = tasks.length ? Math.round(completed / tasks.length * 100) : 0;

document.getElementById("task-count").textContent = tasks.length;
document.getElementById("completed-count").textContent = completed;
document.getElementById("active-count").textContent = active;
document.getElementById("planned-count").textContent = planned;
document.getElementById("progress-value").textContent = percent;
document.getElementById("overall-progress").value = percent;
document.getElementById("overall-progress").textContent = `${percent}%`;
