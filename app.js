const taskInput = document.getElementById("task-input");
const taskDesc = document.getElementById("task-desc");
const addBtn = document.querySelector(".add-btn");
const taskList = document.querySelector(".task-items");
const clearAll = document.querySelector(".clear-tasks");
const searchInput = document.querySelector("#search");
const err = document.querySelector(".err");
const completion = document.getElementById("completion");

let tasks = [];

function updateCompletion() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.checked).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  completion.innerText = `${percent}%`;
}

document.getElementById("task-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const text = taskInput.value.trim();
  const desc = taskDesc.value.trim();
  if (!text) {
    err.style.display = "block";
    setTimeout(() => (err.style.display = "none"), 2000);
    return;
  }

  const li = document.createElement("li");
  li.className = "task";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const taskObj = { li, checked: false };
  checkbox.addEventListener("change", () => {
    taskObj.checked = checkbox.checked;
    updateCompletion();
  });

  const input = document.createElement("input");
  input.type = "text";
  input.disabled = true;
  input.value = text;

  const descElem = document.createElement("p");
  descElem.innerText = desc;
  descElem.style.fontSize = "0.8rem";
  descElem.style.color = "#5a5144";

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const editBtn = document.createElement("button");
  editBtn.innerHTML = "Edit";
  editBtn.className = "edit-btn";
  editBtn.onclick = () => {
    input.disabled = !input.disabled;
    if (!input.disabled) input.focus();
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = () => {
    li.remove();
    tasks = tasks.filter(t => t !== taskObj);
    updateCompletion();
  };

  const pinBtn = document.createElement("button");
  pinBtn.innerHTML = "📌";
  pinBtn.className = "pin-btn";
  pinBtn.onclick = () => {
    taskList.prepend(li);
  };

  actions.append(editBtn, deleteBtn, pinBtn);
  li.append(checkbox, input, descElem, actions);
  taskList.appendChild(li);

  tasks.push(taskObj);
  updateCompletion();
  taskInput.value = "";
  taskDesc.value = "";
});

clearAll.onclick = () => {
  taskList.innerHTML = "";
  tasks = [];
  updateCompletion();
};

searchInput.addEventListener("keyup", (e) => {
  const val = e.target.value.toLowerCase();
  document.querySelectorAll(".task").forEach(task => {
    const text = task.querySelector("input[type='text']").value.toLowerCase();
    task.style.display = text.includes(val) ? "flex" : "none";
  });
});

function updateTime() {
  const now = new Date();
  document.getElementById("time").textContent = now.toLocaleTimeString();
  document.getElementById("date").textContent = now.toDateString();
}

setInterval(updateTime, 1000);
updateTime();
