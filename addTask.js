"use strict";

document.addEventListener("DOMContentLoaded", function () {
  getAllTasks();
  const taskFilterButton = document.querySelector("#filter_btn");
  taskFilterButton.addEventListener("click", function () {
    getTasksWithStatus("Review");
  });
});

function getAllTasks() {
  let id_arr = JSON.parse(localStorage.getItem("id_arr"));
  const l = id_arr.length;
  for (let i = 0; i < l; i++) {
    let post_json_taskObj = JSON.parse(localStorage.getItem(id_arr[i]));
    // renderTask(post_json_taskObj[i]) // can only use this when taskObj is a global class. Now it only exists when the Save button is call
    //data-task-id=${id}
    const html = `
    <hr class="mt-0">
    <div class="newtask-list row"> 
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
        <button type="button" class="btn btn-warning editButton">Edit</button>
        </div>
    </div>`;
    const taskElement = document.createRange().createContextualFragment(html);
    console.log(taskElement);
    const edit = taskElement.querySelector(".editButton");
    
      modal_title.innerText = "Edit Task";
      modal_title.value = modal_title.innerText;
  
    edit.addEventListener("click", editTask)
    taskContainer.append(taskElement);
  }
}
// Eidt function 
function editTask(event){
  console.log("It works");
  const editButton = event.target;
const taskElement = editButton.target.closest(".newtask-list");
const task = this.tasks.find((_t) => taskElement.id === )
  $('#taskModal').modal('show');
  
  
}
const taskContainer = document.querySelector("#tasks");
// create
const taskModalSaveButton = document.querySelector("#task-modal-save");
taskModalSaveButton.addEventListener("click", saveButtonClicked);

// function to save the user input into relevant variables
function saveButtonClicked() {
  //   console.log("Save Button Clicked");
  const id = getId();
  const name = document.querySelector("#taskName").value;
  const description = document.querySelector("#description").value;
  const assignee = document.querySelector("#assigned").value;
  const date = document.querySelector("#date").value;
  // const time = document.querySelector("#time").value;
  const status = document.querySelector("#status").value;

  // Define a the object structure to represent a task
  const taskObj = {
    id,
    name,
    description,
    assignee,
    date,
    status,
  };
  // console.log(taskObj);
  // console.log({ name, description, assignee, date, time, status });
  addItemLocalStorage(taskObj);
  renderTask(taskObj);
}

// Add task class
function getId() {
  // create a unique ID for each task
  return Date.now();
}

// create an array to store id
let id_arr = [];
function addItemLocalStorage(taskObj) {
  id_arr.push(taskObj["id"]);
  // serialize the taskObj into string format to save in localstorage
  let json_taskObj = JSON.stringify(taskObj);
  // serialize the id_arr into string format to save in localstorage
  let json_id_arr = JSON.stringify(id_arr);
  // save the string.taskObj into localstorage
  localStorage.setItem("id_arr", json_id_arr);
  localStorage.setItem(taskObj["id"], json_taskObj);
}

function renderTask(taskObj) {
  const html = `
    <hr class="mt-0">
    <div id=${taskObj["id"]} class="task-list row">
        <div class="col-2">
        <p class="text-left">${taskObj["name"]}</p>
        </div>
        <div class="col-4">
        <p class="text-left">${taskObj["description"]}</p>
        </div>
        <div class="col-2">
        <p class="text-center">${taskObj["assignee"]}</p>
        </div>
        <div class="col-2">
        <p class="text-center">${taskObj["date"]}</p>
        </div>
        <div class="col-2">
        <!-- <p class="text-center">Doing</p> -->
        <select class="text-center">
            <option ${
              taskObj["status"] === "To Do" ? "selected" : ""
            }>To Do</option>                
            <option ${
              taskObj["status"] === "In Progress" ? "selected" : ""
            }>In Progress</option>
            <option ${
              taskObj["status"] === "Review" ? "selected" : ""
            }>Review</option>
            <option ${
              taskObj["status"] === "Done" ? "selected" : ""
            }>Done</option>
        </select>
        </div>
    </div>`;
  const taskElement = document.createRange().createContextualFragment(html);
  taskContainer.append(taskElement);
}
// /.Add task class

// Get all Tasks with a given status

// let status2 = "Review";
function getTasksWithStatus(status2) {
  console.log(status2);
  // if status = To Do, In Progress, Review, Done
  let task_byStatus = [];
  id_arr = JSON.parse(localStorage.getItem("id_arr"));
  const l = id_arr.length;
  console.log(id_arr);
  for (let i = 0; i < l; i++) {
    let post_json_taskByStatus = JSON.parse(localStorage.getItem(id_arr[i]));
    if (post_json_taskByStatus["status"] === status2) {
      task_byStatus.push(post_json_taskByStatus);
    }
  }
  console.log(task_byStatus);
  taskContainer.innerHTML = "";

  for (let j = 0; j < task_byStatus.length; j++) {
    renderTask(task_byStatus[j]);
  }

  // if status = All
  // show all
}

// getTasksWithStatus(status2);
