"use strict";

class TaskManager {
  constructor() {
    this.id_arr = JSON.parse(localStorage.getItem("id_arr"));
    // this.taskList = [];
    this.name = document.querySelector("#taskName");
    this.description = document.querySelector("#description");
    this.assignee = document.querySelector("#assigned");
    this.date = document.querySelector("#date");
    this.status = document.querySelector("#status");
    this.taskContainer = document.querySelector("#tasks");
  }

  refreshPage() {
    // this.id_arr = JSON.parse(localStorage.getItem("id_arr"));
    if (this.id_arr === null) {
      this.id_arr = [];
    }
    const l = this.id_arr.length;
    for (let i = 0; i < l; i++) {
      let postJsonTask = JSON.parse(localStorage.getItem(this.id_arr[i]));
      this.renderTask(postJsonTask);
    }
  }

  addTask() {
    const name = this.name.value;
    const description = this.description.value;
    const assignee = this.assignee.value;
    const date = this.date.value;
    const status = this.status.value;
    const task = new Task(name, description, assignee, date, status);
    modal_title.innerText = "Create Task";
    modal_title.value = modal_title.innerText;
    return task;
  }

  renderTask(task) {
    // 'https://www.designcise.com/web/tutorial/how-to-append-an-html-string-to-an-existing-dom-element-using-javascript'
    // 'https://grrr.tech/posts/create-dom-node-from-html-string/'
    // console.log(task);
    const html = `
    <div id='${task["id"]}' class="task-list row">
      <div class="col-2">
        <p class="text-left">${task["name"]}</p>
      </div>
      <div class="col-3">
        <p class="text-left">${task["description"]}</p>
      </div>
      <div class="col-2">
        <p class="text-center">${task["assignee"]}</p>
      </div>
      <div class="col-2">
        <p class="text-center">${task["date"]}</p>
      </div>
      <div class="col-2">
        <select class="text-center">
          <option ${task["status"] === "To Do" ? "selected" : ""}>To Do</option>
          <option ${
            task["status"] === "In Progress" ? "selected" : ""
          }>In Progress</option>
          <option ${
            task["status"] === "Review" ? "selected" : ""
          }>Review</option>
          <option ${task["status"] === "Done" ? "selected" : ""}>Done</option>
        </select>
      </div>
      <div class="col-1">
        <button type="button" class="btn btn-warning edit">Edit</button>
      </div>
    </div>`;

    // console.log(html);
    // const taskContainer = document.querySelector("#tasks");
    // console.log(taskContainer);
    const taskElement = document.createRange().createContextualFragment(html);
    // console.log(taskElement);
    this.taskContainer.appendChild(taskElement);
    // taskContainer.insertAdjacentHTML("beforeend", html);
    const edit = document.querySelector(".edit");
    edit.addEventListener("click", editTask);
  }

  editTask(event) {
    console.log("It works");
    $("#taskModal").modal("show");
    // const taskElement =
    // event.target.closest(".task-list");

    modal_title.innerText = "Edit Task";
    modal_title.value = modal_title.innerText;
    const taskElement = edit.target.closest(".task-list");
    // // const task = this.tasks.find((_t) => taskElement.id === )
    // const edit = event.target;
    // // const task = this.tasks.find((t) => taskElement.id === t.id);

    // console.log(taskElement);
    console.log(taskElement.id);
  }

  toLocalStorage(task) {
    // console.log(task);
    this.id_arr.push(task["id"]);
    // console.log(this.id_arr);
    // serialize the id_arr into string format to save in localstorage
    let json_id_arr = JSON.stringify(this.id_arr);
    // serialize the taskObj into string format to save in localstorage
    let json_task = JSON.stringify(task);
    // save the string.taskObj into localstorage
    localStorage.setItem("id_arr", json_id_arr);
    localStorage.setItem(task["id"], json_task);
  }

  filterTask(stt) {
    const taskByStatus = [];
    for (let i = 0; i < this.id_arr.length; i++) {
      let post_json_taskByStatus = JSON.parse(
        localStorage.getItem(this.id_arr[i])
      );
      if (post_json_taskByStatus["status"] === stt) {
        taskByStatus.push(post_json_taskByStatus);
      } else if (stt === "All") {
        taskByStatus.push(post_json_taskByStatus);
      }
    }
    // console.log(taskByStatus);
    this.taskContainer.innerHTML = "";
    for (let j = 0; j < taskByStatus.length; j++) {
      this.renderTask(taskByStatus[j]);
    }
  }

  resetForm() {
    document.querySelector("#task-form").reset();
  }

  disableBtn() {
    document.querySelector("#task-modal-save").disabled = true;
  }

  validation() {
    const name = this.name;
    const description = this.description;
    const assignee = this.assignee;
    const date = this.date;

    // window.addEventListener("load", () => {
    //   document.querySelector("#task-modal-save").disabled = true;
    // });
    // window.addEventListener("load", disableSubmit);
    name.addEventListener("focus", validate);
    description.addEventListener("focus", validate);
    assignee.addEventListener("focus", validate);
    date.addEventListener("change", validate);

    //    ============================ Validate form===============================
    function validate() {
      const taskName = name.value.trim();
      const descriptionInput = description.value.trim();
      const assigne = assignee.value.trim();

      // =============================Task name validation========================
      if (taskName == "" || taskName.length < 8) {
        error(name, "Enter a task name with 8 or more char");
      } else {
        submit(name);
      }

      // =============================Description validation========================
      if (descriptionInput == "" || descriptionInput.length < 15) {
        error(description, "Enter task description with 15 or more char");
      } else {
        submit(description);
      }

      // =============================Assignee validation========================
      if (assigne == "" || assigne.length < 4) {
        error(assignee, "Enter assignee name with more than 4 cha");
      } else {
        submit(assignee);
      }

      // =============================Date validation========================
      const dateInpute = date.value;
      var currentDate = new Date().toISOString().slice(0, 10);

      // console.log(date);
      if (dateInpute == null || dateInpute == "") {
        error(date, "Task must have a due date");
      } else if (dateInpute < currentDate) {
        error(date, "Task cannot be created in past date");
      } else {
        submit(date);
      }
    }

    function error(input, message) {
      const formgroup = input.parentElement;
      const err = formgroup.querySelector("#err");
      err.innerText = message;
      err.style.color = "red";
      formgroup.className = "form-group error";
      document.querySelector("#task-modal-save").disabled = true;
    }

    function submit(input) {
      const formgroup = input.parentElement;
      const err = formgroup.querySelector("#err");
      err.innerText = "Looks good!";
      err.style.color = "green";
      formgroup.className = "form-group success";
      document.querySelector("#task-modal-save").disabled = false;
    }
  }

  // Update task to tasklist
  //   updateTask(id, name, description, assignee, date, status) {
  //     for (let i = 0; i < this.taskList.length; i++) {
  //       if (this.taskList[i].id === id) {
  //         this.taskList[i].name = name;
  //         this.taskList[i].description = description;
  //         this.taskList[i].assignee = assignee;
  //         this.taskList[i].date = date;
  //         // this.taskList[i].time = time;
  //         this.taskList[i].status = status;
  //         // this.taskList[i].priority = priority;
  //         break;
  //       }
  //     }
  //   }
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

function editTask() {
  taskManager.editTask();
}

// function editTaskClicked(event) {
//   // clearValidation(); // What does this line mean?

//   const taskElement = event.target.closest(".task-list"); // What does this line mean?
//   const task = taskManager.taskList.find((t) => taskElement.id === t.id); // What does this line mean?

//   taskIdInput.value = task.id;
//   taskNameInput.value = task.name;
//   taskDescriptionInput.value = task.description;
//   taskAssigneeInput.value = task.assignee;
//   taskDateInput.value = task.date;
//   // taskTimeInput.value = task.time;
//   taskStatusInput.value = task.status;

//   $("#task-modal").modal("show"); // What does this line mean?
// }

// Why cant the arg for this func is the obj task which was created in addTask func?
function updateTask(id, name, description, assignee, date, status) {
  taskManager.updateTask(id, name, description, assignee, date, status);
}

// Execution
document.addEventListener("DOMContentLoaded", function () {
  taskManager.refreshPage();
  filter_dropDown.value = "All";
});

const taskCreateButton = document.querySelector("#create_btn");
const taskModalSaveButton = document.querySelector("#task-modal-save");
const taskManager = new TaskManager();
const filter_dropDown = document.querySelector(".filter_dropDown");
// const edit = document.querySelector(".edit");
// edit.addEventListener("click", editTask);

taskCreateButton.addEventListener("click", function () {
  // taskManager.disableBtn();
  taskManager.resetForm();
  // taskManager.validation();
});

taskModalSaveButton.addEventListener("click", function () {
  const taskObj = taskManager.addTask();
  taskManager.renderTask(taskObj);
  taskManager.toLocalStorage(taskObj);
  console.log(taskManager.id_arr);
});

filter_dropDown.addEventListener("click", function () {
  taskManager.filterTask(filter_dropDown.value);
});
