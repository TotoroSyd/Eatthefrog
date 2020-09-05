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
  const taskManager = new TaskManager(
    name,
    description,
    assignee,
    date,
    status
  );
  const formManager = new FormManager();
  const taskCreateButton = document.querySelector("#create_btn");
  const taskModalSaveButton = document.querySelector("#task_modal_save");

  // const filter_dropDown = document.querySelector(".filter_dropDown");
  const welcome_button_more = document.querySelector(".welcome_button_more");
  const welcome_todo = document.querySelector("#welcome_todo");
  const welcome_dueSoon = document.querySelector("#welcome_dueSoon");
  const welcome_tmr = document.querySelector("#welcome_tmr");
  const summary_card_content_todo = document.querySelector(
    "#summary_card_content_todo"
  );

  const hidden_banner_button = document.querySelector(".hidden_banner_button");

  const sideBarAll = document.querySelector("#sideBarAll");
  const sideBarToDo = document.querySelector("#sideBarToDo");
  const sideBarInProgress = document.querySelector("#sideBarInProgress");
  const sideBarReview = document.querySelector("#sideBarReview");
  const badgeToDo = document.querySelector("#BadgeToDo");

  // Update summary_card_content_todo with # of Todo on the current date
  summary_card_content_todo.innerHTML = taskManager.countTaskByStatus("To Do");

  // Update BadgeToDo with # of Todo on the current date
  badgeToDo.innerHTML = taskManager.countTaskByStatus("To Do");

  // When welcome_button_more clicked, hide welcome banner, show content
  welcome_button_more.addEventListener("click", function () {
    taskManager.hideWelcomeBanner();
  });

  // When hidden_banner_button clicked, hide content, show welcome banner
  hidden_banner_button.addEventListener("click", function () {
    taskManager.hideContent();
  });

  // When welcome_dueSoon clicked, show tasks that are due in days from current day
  welcome_dueSoon.addEventListener("click", function () {
    taskManager.hideWelcomeBanner();
  });

  // When welcome_tmr clicked, show tasks that are due in days from current day
  welcome_tmr.addEventListener("click", function () {
    taskManager.hideWelcomeBanner();
  });

  //When welcome_todo clicked, show filter only Todo for Today
  welcome_todo.addEventListener("click", function () {
    taskManager.hideWelcomeBanner();
    taskManager.filterTask("To Do");
  });

  //Refresh page and display tasks saved in localStorage.
  taskManager.refreshPage();
  // hide everything except welcome banner
  taskManager.hideContent();
  // initiate editButtonClicked()
  taskManager.editButtonnClicked();
  // reset status filterTask(status) to All
  taskManager.filterTask("All");

  taskCreateButton.addEventListener("click", function () {
    // refresh Save button
    if ((task_modal_save.value = "Update")) {
      task_modal_save.innerText = "Save";
      task_modal_save.value = task_modal_save.innerText;
    }
    formManager.disableBtn();
    formManager.resetForm();
    formManager.validation(name, description, assignee, date);
  });

  taskModalSaveButton.addEventListener("click", function (id_to_update) {
    // check if the data-action attribute in form is edit-action.
    if (form.getAttribute("data-action") === "edit-action") {
      let updated_name = form.taskName.value;
      let updated_description = form.description.value;
      let updated_assignee = form.assignee.value;
      let updated_date = form.date.value;
      let update_status = form.status.value;
      let id_to_update = form.getAttribute("id-to-update");
      taskManager.updateTask(
        id_to_update,
        updated_name,
        updated_description,
        updated_assignee,
        updated_date,
        update_status
      );
      taskManager.refreshPage();
    } else {
      const taskObj = taskManager.createTask(
        name.value,
        description.value,
        assignee.value,
        date.value,
        status.value
      );
      const html = taskManager.toHTML(taskObj);
      taskManager.renderTask(html);
      taskManager.toLocalStorage(taskObj);
      // console.log(taskManager.id_arr);
    }
  });

  // filter button clicked
  sideBarAll.addEventListener("click", () => {
    taskManager.filterTask("All");
  });

  sideBarToDo.addEventListener("click", function () {
    taskManager.filterTask("To Do");
  });

  sideBarInProgress.addEventListener("click", function () {
    taskManager.filterTask("In Progress");
  });

  sideBarReview.addEventListener("click", function () {
    taskManager.filterTask("Review");
  });

  // initiate deleteButtonnClicked() to show Delete Confirmation Modal
  taskManager.deleteButtonnClicked();
  const confirmToDeleteButton = document.querySelector(
    "#confirm-to-delete-btn"
  );
  // "Delete" button in the Delete Confirmation Modal triggers confirmToDeleteButtonClicked()
  // confirmToDeleteButtonClicked() will run deleteTask()
  confirmToDeleteButton.addEventListener("click", function () {
    const id_del = taskManager.confirmToDeleteButtonClicked();
    taskManager.deleteTask(id_del);
  });
});
