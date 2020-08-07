"use strict";

class TaskManager {
  constructor() {
    this.id_arr = [];
    this.taskList = [];
  }

  addTask() {
    const name = document.querySelector("#taskName").value;
    const description = document.querySelector("#description").value;
    const assignee = document.querySelector("#assigned").value;
    const date = document.querySelector("#date").value;
    const status = document.querySelector("#status").value;
    const task = new Task(name, description, assignee, date, status);
    console.log(task);
    this.taskList.push(task);
    console.log(this.taskList);
  }

  renderTask(task) {
    const html = `
    <hr class="mt-0">
    <div id='${task["id"]} class="task-list row">
        <div class="col-2">
        <p class="text-left">${task["name"]}</p>
        </div>
        <div class="col-4">
        <p class="text-left">${task["description"]}</p>
        </div>
        <div class="col-2">
        <p class="text-center">${task["assignee"]}</p>
        </div>
        <div class="col-2">
        <p class="text-center">${task["date"]}</p>
        </div>
        <div class="col-2">
        <!-- <p class="text-center">Doing</p> -->
        <select class="text-center">
            <option ${
              task["status"] === "To Do" ? "selected" : ""
            }>To Do</option>
            <option ${
              task["status"] === "In Progress" ? "selected" : ""
            }>In Progress</option>
            <option ${
              task["status"] === "Review" ? "selected" : ""
            }>Review</option>
            <option ${task["status"] === "Done" ? "selected" : ""}>Done</option>
        </select>
        </div>
    </div>`;
    const taskElement = document.createRange().createContextualFragment(html);
    taskContainer.append(taskElement);
  }
  // Update task to tasklist
  updateTask(id, name, description, assignee, date, status) {
    for (let i = 0; i < this.taskList.length; i++) {
      if (this.taskList[i].id === id) {
        this.taskList[i].name = name;
        this.taskList[i].description = description;
        this.taskList[i].assignee = assignee;
        this.taskList[i].date = date;
        // this.taskList[i].time = time;
        this.taskList[i].status = status;
        // this.taskList[i].priority = priority;
        break;
      }
    }
  }
}

class Task {
  constructor(name, description, assignee, date, status) {
    this.id = Date.now();
    this.name = name;
    this.description = description;
    this.assignee = assignee;
    this.date = date;
    this.status = status;
  }
}

function addTask() {
  taskManager.addTask();
}

function renderTask(task) {
  taskManager.renderTask(task);
}

function editTaskClicked(event) {
  // clearValidation(); // What does this line mean?

  const taskElement = event.target.closest(".task-list"); // What does this line mean?
  const task = taskManager.taskList.find((t) => taskElement.id === t.id); // What does this line mean?

  taskIdInput.value = task.id;
  taskNameInput.value = task.name;
  taskDescriptionInput.value = task.description;
  taskAssigneeInput.value = task.assignee;
  taskDateInput.value = task.date;
  // taskTimeInput.value = task.time;
  taskStatusInput.value = task.status;

  $("#task-modal").modal("show"); // What does this line mean?
}

// Why cant the arg for this func is the obj task which was created in addTask func?
function updateTask(id, name, description, assignee, date, status) {
  taskManager.updateTask(id, name, description, assignee, date, status);
}

// Execution
const taskContainer = document.querySelector("#tasks");
const taskModalSaveButton = document.querySelector("#task-modal-save");
const taskManager = new TaskManager();

taskModalSaveButton.addEventListener("click", addTask);
