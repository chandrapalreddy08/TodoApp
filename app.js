document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));

  if (storedTasks) {
    storedTasks.forEach((task) => tasks.push(task));
    updateTaskList();
    updateStats();
  }
});
let tasks = [];

const savedTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });
    updateTaskList();
    updateStats();
    savedTasks();
  }
};

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
  updateStats();
  savedTasks();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTaskList();
  updateStats();
  savedTasks();
};

const editTask = (index) => {
  const taskInput = document.getElementById("taskInput");
  taskInput.value = tasks[index].text;
  tasks.splice(index, 1);
  updateTaskList();
  updateStats();
  savedTasks();
};

const updateStats = () => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progress = (completedTasks / totalTasks) * 100;
  const progressBar = document.getElementById("progress");
  progressBar.style.width = `${progress}%`;

  document.getElementById("numbers").innerText =
    `${completedTasks} / ${totalTasks}`;

    if(tasks.length && completedTasks === totalTasks) {
        blastConfetti();
    }
};

const updateTaskList = () => {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    console.log(tasks);

    listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox"  ${task.completed ? "checked" : ""}>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./Images/edit.jpeg" alt="" onclick="editTask(${index})">
                <img src="./Images/bin.jpeg" alt="" onclick="deleteTask(${index})">
            </div>
        </div>
        `;
    listItem.addEventListener("change", () => toggleTaskComplete(index));
    taskList.appendChild(listItem);
  });
};

document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});


const blastConfetti = () => {
    const count = 200,
  defaults = { origin: { y: .7 } };

function fire(particleRatio, opts) {
  confetti(Object.assign({}, defaults, opts, { particleCount: Math.floor(count * particleRatio) }));
}
fire(.25, {
  spread: 26,
  startVelocity: 55
});
fire(.2, { spread: 60 });
fire(.35, {
  spread: 100,
  decay: .91,
  scalar: .8
});
fire(.1, {
  spread: 120,
  startVelocity: 25,
  decay: .92,
  scalar: 1.2
});
fire(.1, {
  spread: 120,
  startVelocity: 45
});
}
