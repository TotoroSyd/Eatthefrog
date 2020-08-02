"use strict";

document.addEventListener("DOMContentLoaded", getAllTasks);
function getAllTasks() {
  id_arr = JSON.parse(localStorage.getItem("id_arr"));
  const l = id_arr.length;
  for (let i = 0; i < l; i++) {
    let post_json_taskObj = JSON.parse(localStorage.getItem(id_arr[i]));
    // renderTask(post_json_taskObj[i]) // can only use this when taskObj is a global class. Now it only exists when the Save button is call
    const html = `
    <hr class="mt-0">
    <div class="task-list row">
        <div class="col-2">
        <p class="text-left">${post_json_taskObj["name"]}</p>
        </div>
        <div class="col-4">
        <p class="text-left">${post_json_taskObj["description"]}</p>
        </div>
        <div class="col-2">
        <p class="text-center">${post_json_taskObj["assignee"]}</p>
        </div>
        <div class="col-2">
        <p class="text-center">${post_json_taskObj["date"]}</p>
        </div>
        <div class="col-2">
        <!-- <p class="text-center">Doing</p> -->
        <select class="text-center">
            <option ${
              post_json_taskObj["status"] === "To Do" ? "selected" : ""
            }>To Do</option>                
            <option ${
              post_json_taskObj["status"] === "In Progress" ? "selected" : ""
            }>In Progress</option>
            <option ${
              post_json_taskObj["status"] === "Review" ? "selected" : ""
            }>Review</option>
            <option ${
              post_json_taskObj["status"] === "Done" ? "selected" : ""
            }>Done</option>
        </select>
        </div>
    </div>`;
    const taskElement = document.createRange().createContextualFragment(html);
    taskContainer.append(taskElement);
  }
}

const taskContainer = document.querySelector("#tasks");
// create
const taskModalSaveButton = document.querySelector("#task-modal-save");
taskModalSaveButton.addEventListener("click", saveButtonClicked);

// function to save the user input into relevant variables
function saveButtonClicked() {
  //   console.log("Save Button Clicked");
  const name = document.querySelector("#taskName").value;
  const description = document.querySelector("#description").value;
  const assignee = document.querySelector("#assigned").value;
  const date = document.querySelector("#date").value;
  const time = document.querySelector("#time").value;
  const status = document.querySelector("#status").value;

  //   console.log({ name, description, assignee, date, time, status });
  addTask(name, description, assignee, date, time, status);
}

function addTask(name, description, assignee, date, time, status) {
  const html = `
    <hr class="mt-0">
    <div class="task-list row">
        <div class="col-2">
        <p class="text-left">${name}</p>
        </div>
        <div class="col-4">
        <p class="text-left">${description}</p>
        </div>
        <div class="col-2">
        <p class="text-center">${assignee}</p>
        </div>
        <div class="col-2">
        <p class="text-center">${date}</p>
        </div>
        <div class="col-2">
        <!-- <p class="text-center">Doing</p> -->
        <select class="text-center">
            <option ${
              status === "To Do" ? "selected" : ""
            }>To Do</option>                
            <option ${
              status === "In Progress" ? "selected" : ""
            }>In Progress</option>
            <option ${status === "Review" ? "selected" : ""}>Review</option>
            <option ${status === "Done" ? "selected" : ""}>Done</option>
        </select>
        </div>
    </div>`;
  const taskElement = document.createRange().createContextualFragment(html);
  taskContainer.append(taskElement);
}
