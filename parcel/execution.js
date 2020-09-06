"use strict";
import TaskManager from "./task_manager.js";
import FormManager from "./form_manager.js";

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
  const sideBarDone = document.querySelector("#sideBarDone");

  const badgeAll = document.querySelector("#badgeAll");
  const badgeToDo = document.querySelector("#badgeToDo");
  const badgeInProgress = document.querySelector("#badgeInProgress");
  const badgeReview = document.querySelector("#badgeReview");
  const badgeDone = document.querySelector("#badgeDone");

  // Update summary_card_content_todo with # of Todo on the current date
  // summary_card_content_todo.innerHTML = taskManager.countTaskByStatus("To Do");
  taskManager.updateCountTaskDisplay(
    summary_card_content_todo,
    taskManager.countTaskByStatus("To Do")
  );

  // // Update sidebar badge
  taskManager.updateCountTaskDisplay(
    badgeAll,
    taskManager.countTaskByStatus("All")
  );

  taskManager.updateCountTaskDisplay(
    badgeToDo,
    taskManager.countTaskByStatus("To Do")
  );

  taskManager.updateCountTaskDisplay(
    badgeInProgress,
    taskManager.countTaskByStatus("In Progress")
  );

  taskManager.updateCountTaskDisplay(
    badgeReview,
    taskManager.countTaskByStatus("Review")
  );

  taskManager.updateCountTaskDisplay(
    badgeDone,
    taskManager.countTaskByStatus("Done")
  );

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
    // Check modal title. Change it back to Create if it is still in Edit mode
    // Reference to understand innertext, value
    // https://medium.com/better-programming/whats-best-innertext-vs-innerhtml-vs-textcontent-903ebc43a3fc
    const modal_title = document.querySelector("#modal_title");
    // console.log("Before clicking");
    // console.log(modal_title.value);
    // console.log(modal_title.innerText);
    // console.log(modal_title.innerHTML);
    // console.log(modal_title.textContent);
    if (modal_title.innerText === "Edit Task") {
      modal_title.innerText = "Create Task";
    }
    // console.log("After clicking");
    // console.log(modal_title.value);
    // console.log(modal_title.innerText);
    // console.log(modal_title.innerHTML);
    // console.log(modal_title.textContent);
    // refresh Save button
    if ((task_modal_save.value = "Update")) {
      task_modal_save.innerText = "Save";
      task_modal_save.value = task_modal_save.innerText;
    }
    // Check id data-action is still in Edit state or not.
    // If yes, removeAttribute "data-action", "id-to-update" from form
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
      // Update sidebar badge
      taskManager.updateCountTaskDisplay(
        badgeAll,
        taskManager.countTaskByStatus("All")
      );

      taskManager.updateCountTaskDisplay(
        badgeToDo,
        taskManager.countTaskByStatus("To Do")
      );

      taskManager.updateCountTaskDisplay(
        badgeInProgress,
        taskManager.countTaskByStatus("In Progress")
      );

      taskManager.updateCountTaskDisplay(
        badgeReview,
        taskManager.countTaskByStatus("Review")
      );

      taskManager.updateCountTaskDisplay(
        badgeDone,
        taskManager.countTaskByStatus("Done")
      );

      // Update summary card
      taskManager.updateCountTaskDisplay(
        summary_card_content_todo,
        taskManager.countTaskByStatus("To Do")
      );
    } else {
      const taskObj = taskManager.createTask(
        name.value,
        description.value,
        assignee.value,
        date.value,
        status.value
      );
      // Render the task to page
      const html = taskManager.toHTML(taskObj);
      taskManager.refreshPage();
      taskManager.renderTask(html);
      // Update the task to localStorage
      taskManager.toLocalStorage(taskObj);
      // Update this.task_list in taskManager class so countTaskByStatus can use the lastest tasklist
      // taskManager.id_arr = JSON.parse(
      //   taskManager.localStorage.getItem("id_arr")
      // );
      taskManager.task_list = taskManager.getTasksFromLocalStorage();
      // Update sidebar badge
      taskManager.updateCountTaskDisplay(
        badgeAll,
        taskManager.countTaskByStatus("All")
      );

      taskManager.updateCountTaskDisplay(
        badgeToDo,
        taskManager.countTaskByStatus("To Do")
      );

      taskManager.updateCountTaskDisplay(
        badgeInProgress,
        taskManager.countTaskByStatus("In Progress")
      );

      taskManager.updateCountTaskDisplay(
        badgeReview,
        taskManager.countTaskByStatus("Review")
      );

      taskManager.updateCountTaskDisplay(
        badgeDone,
        taskManager.countTaskByStatus("Done")
      );

      // Update summary card
      taskManager.updateCountTaskDisplay(
        summary_card_content_todo,
        taskManager.countTaskByStatus("To Do")
      );
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

  sideBarDone.addEventListener("click", function () {
    taskManager.filterTask("Done");
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
    // Update sidebar badge
    taskManager.updateCountTaskDisplay(
      badgeAll,
      taskManager.countTaskByStatus("All")
    );

    taskManager.updateCountTaskDisplay(
      badgeToDo,
      taskManager.countTaskByStatus("To Do")
    );

    taskManager.updateCountTaskDisplay(
      badgeInProgress,
      taskManager.countTaskByStatus("In Progress")
    );

    taskManager.updateCountTaskDisplay(
      badgeReview,
      taskManager.countTaskByStatus("Review")
    );

    taskManager.updateCountTaskDisplay(
      badgeDone,
      taskManager.countTaskByStatus("Done")
    );
    // Update summary card
    taskManager.updateCountTaskDisplay(
      summary_card_content_todo,
      taskManager.countTaskByStatus("To Do")
    );
  });
});
