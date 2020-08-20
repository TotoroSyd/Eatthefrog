"use strict";
import TaskManager from "./task_manager.js";
import FormManager from "./form_manager.js";
import Task from "./task.js";

// Execution
// use "DOMContentLoaded" for safety, to ensure all the neccessary content is loaded.
document.addEventListener("DOMContentLoaded", function () {
  const form = document.forms["task-form"];
  // const name = document.querySelector('name')
  const name = form.taskName;
  const description = form.description;
  const assignee = form.assignee;
  const date = form.date;
  const status = form.status;
  const formManager = new FormManager();
  const task = new Task();
  const taskManager = new TaskManager(
    name,
    description,
    assignee,
    date,
    status
  );
  const taskCreateButton = document.querySelector("#create_btn");
  const taskModalSaveButton = document.querySelector("#task-modal-save");
  const filter_dropDown = document.querySelector(".filter_dropDown");

  taskManager.refreshPage();
  taskManager.deleteButtonnClicked();
  filter_dropDown.value = "All";

  taskCreateButton.addEventListener("click", function () {
    formManager.disableBtn();
    formManager.resetForm();
    formManager.validation();
  });

  taskModalSaveButton.addEventListener("click", function () {
    const taskObj = taskManager.createTask();
    const html = task.toHTML(taskObj);
    taskManager.renderTask(html);
    taskManager.toLocalStorage(taskObj);
    // console.log(taskManager.id_arr);
  });

  filter_dropDown.addEventListener("click", function () {
    taskManager.filterTask(filter_dropDown.value);
  });
});
