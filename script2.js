"use strict";

class TaskManager {
  constructor() {
    this.id_arr = [];
    this.taskList = [];
  }
  //   const name = document.querySelector("#taskName").value;
  //   const description = document.querySelector("#description").value;
  //   const assignee = document.querySelector("#assigned").value;
  //   const date = document.querySelector("#date").value;
  //   const status = document.querySelector("#status").value;

  addTask(name, description, assignee, date, status) {
    const task = new Task(name, description, assignee, date, status);
    this.taskList.push(task);
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

function addTask(name, description, assignee, date, status) {
  taskManager.addTask(name, description, assignee, date, status);
}

function renderTask(task) {
  taskManager.renderTask(task);
}

// Execution
const taskContainer = document.querySelector("#tasks");
const taskModalSaveButton = document.querySelector("#task-modal-save");
const taskManager = new TaskManager();
taskModalSaveButton.addEventListener("click", addTask);
