const form = document.getElementById("taskForm");
const list = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function render() {
  list.innerHTML = "";
  tasks.forEach((t, i) => {
    const li = document.createElement("li");
    li.textContent = `${t.time} — ${t.task}`;
    list.appendChild(li);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const time = document.getElementById("time").value;
  const task = document.getElementById("task").value;

  tasks.push({ time, task });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  scheduleNotification(time, task);
  render();
  form.reset();
});

function scheduleNotification(time, task) {
  const now = new Date();
  const [h, m] = time.split(":");
  const notifyTime = new Date();
  notifyTime.setHours(h, m, 0);
  const delay = notifyTime - now;
  if (delay > 0) {
    setTimeout(() => {
      new Notification("⏰ Reminder", { body: task });
    }, delay);
  }
}

if ("Notification" in window) {
  Notification.requestPermission();
}

render();
