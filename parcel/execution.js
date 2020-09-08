"use strict";
import TaskManager from "./task_manager.js";
import FormManager from "./form_manager.js";
// import Message from "./message.js";

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
  const todo = document.querySelector(".todo");
  const dueSoon = document.querySelector(".soon");
  const tmr = document.querySelector(".tmr");

  const hidden_banner_button = document.querySelector(".hidden_banner_button");

  const sideBarAll = document.querySelector("#sideBarAll");
  const sideBarToDo = document.querySelector("#sideBarToDo");
  const sideBarToDoToDay = document.querySelector("#sideBarToDoToDay");
  const sideBarInProgress = document.querySelector("#sideBarInProgress");
  const sideBarReview = document.querySelector("#sideBarReview");
  const sideBarDone = document.querySelector("#sideBarDone");
  const sideBarTomorrow = document.querySelector("#sideBarTomorrow");
  const sideBarSoon = document.querySelector("#sideBarSoon");

  // Update summary_card_content_
  taskManager.updateSummaryCardContent();
  // Update sidebar badge
  taskManager.updateSideBarBadge();

  // When todo clicked, show filter only Todo for Today
  todo.addEventListener("click", function () {
    taskManager.hideWelcomeBanner();
    taskManager.filterTaskByStatus("To Do", true);
  });

  // When tmr clicked, show tasks that are due Tomorrow
  tmr.addEventListener("click", function () {
    taskManager.hideWelcomeBanner();
    taskManager.isTmr();
  });

  // When dueSoon clicked, show tasks that are due in 3 days from Today
  dueSoon.addEventListener("click", function () {
    taskManager.hideWelcomeBanner();
    let start_date = new Date();
    let period = 3;
    taskManager.filterTaskByDate(start_date, period);
  });

  // When welcome_button_more clicked, hide welcome banner, show content
  welcome_button_more.addEventListener("click", function () {
    taskManager.hideWelcomeBanner();
  });

  // When hidden_banner_button clicked, hide content, show welcome banner
  hidden_banner_button.addEventListener("click", function () {
    taskManager.hideContent();
  });

  //Refresh page and display tasks saved in localStorage.
  taskManager.refreshPage();
  // hide everything except welcome banner
  taskManager.hideContent();
  // initiate editButtonClicked()
  taskManager.editButtonnClicked();
  // reset status filterTaskByStatus(status) to All
  taskManager.filterTaskByStatus("All");

  taskCreateButton.addEventListener("click", function () {
    // Check modal title. Change it back to Create if it is still in Edit mode
    // Reference to understand innertext, value
    // https://medium.com/better-programming/whats-best-innertext-vs-innerhtml-vs-textcontent-903ebc43a3fc
    const modal_title = document.querySelector("#modal_title");

    // Change modal_title back to Create Task
    if (modal_title.innerText === "Edit Task") {
      modal_title.innerText = "Create Task";
    }

    // refresh Save button
    if ((task_modal_save.value = "Update")) {
      task_modal_save.innerText = "Save";
      task_modal_save.value = task_modal_save.innerText;
    }

    // Check id data-action is still in Edit state or not.
    // If yes, removeAttribute "data-action", "id-to-update" from <form>
    // Otherwise, when Save button is clicked, Edittask overwrite CreateTask
    if (form.getAttribute("data-action") === "edit-action") {
      form.removeAttribute("data-action");
      form.removeAttribute("id-to-update");
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
      // Update summary_card_content_
      taskManager.updateSummaryCardContent();
      // Update sidebar badge
      taskManager.updateSideBarBadge();
    }
    // check if the data-action attribute in form is not edit-action.
    else {
      const taskObj = taskManager.createTask(
        name.value,
        description.value,
        assignee.value,
        date.value,
        status.value
      );
      // Render the task to page
      taskManager.refreshPage();
      const html = taskManager.toHTML(taskObj);
      taskManager.renderTask(html);
      // Update the task to localStorage
      taskManager.toLocalStorage(taskObj);
      // Update this.task_list in taskManager class so countTaskByStatus can use the lastest tasklist
      // taskManager.id_arr = JSON.parse(
      //   taskManager.localStorage.getItem("id_arr")
      // );
      taskManager.task_list = taskManager.getTasksFromLocalStorage();
      // Update summary_card_content_
      taskManager.updateSummaryCardContent();
      // Update sidebar badge
      taskManager.updateSideBarBadge();
    }
  });

  // filter sidebar button clicked
  sideBarAll.addEventListener("click", () => {
    taskManager.filterTaskByStatus("All");
  });

  sideBarToDo.addEventListener("click", function () {
    taskManager.filterTaskByStatus("To Do");
  });

  sideBarToDoToDay.addEventListener("click", function () {
    taskManager.filterTaskByStatus("To Do", true);
  });

  sideBarInProgress.addEventListener("click", function () {
    taskManager.filterTaskByStatus("In Progress");
  });

  sideBarReview.addEventListener("click", function () {
    taskManager.filterTaskByStatus("Review");
  });

  sideBarDone.addEventListener("click", function () {
    taskManager.filterTaskByStatus("Done");
  });

  sideBarTomorrow.addEventListener("click", function () {
    taskManager.isTmr();
  });

  sideBarSoon.addEventListener("click", function () {
    taskManager.filterTaskByDate(new Date(), 3);
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
    // Update summary_card_content_
    taskManager.updateSummaryCardContent();
    // Update sidebar badge
    taskManager.updateSideBarBadge();
  });
});
