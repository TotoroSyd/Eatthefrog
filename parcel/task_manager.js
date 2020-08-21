"use strict";
import Task from "./parcel/task.js";

export default class TaskManager {
  constructor(name, description, assignee, date, status) {
    // refresh id_arr to keep track tasks that were created
    this.id_arr = JSON.parse(localStorage.getItem("id_arr"));
    /* Method 1 to get input from form field.
      this.name = document.querySelector("#taskName");
        Method 2 to get input from form field. id and name can be interchanged.
      https://www.dyn-web.com/tutorials/forms/references.php */
    this.name = name;
    this.description = description;
    this.assignee = assignee;
    this.date = date;
    this.status = status;
    this.taskContainer = document.querySelector("#tasks");
  }

  refreshPage() {
    // clear everything on the page before loading content
    this.taskContainer.innerHTML = "";
    // in case id_arr in the local storage is empty, set it as an empty array. Otherwise, id_arr becomes null => break the program
    if (this.id_arr === null) {
      this.id_arr = [];
    }
    // run through the id_arr's element = key to look for task in local storage. For each id element, go to localStorage and getItem and parse it.
    this.id_arr.forEach((id) => {
      let postJsonTask = JSON.parse(localStorage.getItem(id));
      // debugger;
      // once the task is parsed from localstorage, it is an input to go to toHTML(), renderTask()
      const html = this.toHTML(postJsonTask);
      this.renderTask(html);
    });
  }

  createTask() {
    const name = this.name.value;
    const description = this.description.value;
    const assignee = this.assignee.value;
    const date = this.date.value;
    const status = this.status.value;
    const task = new Task(name, description, assignee, date, status);
    // return a task object which will be an input for toHTML(), renderTask()
    return task;
  }

  toHTML(task) {
    // 'https://www.designcise.com/web/tutorial/how-to-append-an-html-string-to-an-existing-dom-element-using-javascript'
    // 'https://grrr.tech/posts/create-dom-node-from-html-string/'
    // console.log(task);
    const html = `
    <div id='${task["id"]}' class="task-list row">
      <p class="col-2 text-left">${task["name"]}</p>
      <p class="col-3 text-left">${task["description"]}</p>
      <p class=" col-2 text-center">${task["assignee"]}</p>
      <p class="text-center col-2">${task["date"]}</p>
      <p class="col-2 text-center">${task["status"]}</p>
      <a href="#" data-toggle="tooltip" title="Edit" class="edit-btn" data-task-id='${task["id"]}'><img src="image/pencil-edit-button.svg" alt="pencil-edit-button" width="15" height="15"/></a>
      <a href="#" data-toggle="tooltip" title="Delete" class="delete-btn" data-task-id='${task["id"]}'><img src="image/trash.svg" alt="delete-button" width="15" height="15"/></a>
    </div>`;
    return html;
  }
  renderTask(html) {
    const taskElement = document.createRange().createContextualFragment(html);
    //  const edit = taskElement.querySelector(".edit");
    //  edit.addEventListener("click", editTask);
    this.taskContainer.appendChild(taskElement);
    // taskContainer.insertAdjacentHTML("beforeend", html);
  }

  toLocalStorage(task) {
    // Push new id to id_arr
    this.id_arr.push(task["id"]);
    // console.log(this.id_arr);
    // serialize the id_arr into string format to save in localstorage
    let json_id_arr = JSON.stringify(this.id_arr);
    // serialize the taskObj into string format to save in localstorage
    let json_task = JSON.stringify(task);
    // save to the local storage the id_arr containing all task id
    localStorage.setItem("id_arr", json_id_arr);
    // save to the local storage the task object
    localStorage.setItem(task["id"], json_task);
  }

  editButtonnClicked() {
    /* Because the Edit Icon doesnt exist in HTML so we have to capture the event
    (which is created by clicking to the Delete icon)
    on the parent container (which exists in the HTML).
    This is due to the Event Bubbling.*/

    const container_edit = document.querySelector("#accordion");
    // Parent container listens to the "click" event from the children and run the function

    container_edit.addEventListener("click", (event) => {
      // debugger;

      /* When the event is listened, go find (target) the closest .edit-btn.
      The closest() method traverses the Element and its parents (heading toward the document root)
      until it finds a node that matches the provided selector string.
      Will return itself or the matching ancestor. If no such element exists, it returns null. */

      const edit_btn = event.target.closest(".edit-btn");

      /* If there is a edit-btn, wrap the attribute called "data-task-id" = id of the particular task.
      "data-task-id" = input to run editTask() */

      if (edit_btn) {
        const id_edit = edit_btn.getAttribute("data-task-id");
        this.editTask(id_edit);
      }
    });
  }

  editTask(id_edit) {
    console.log(id_edit);
    // console.log("It works");
    // Open and change Modal title to Edit
    $("#taskModal").modal("show");
    modal_title.innerText = "Edit Task";
    modal_title.value = modal_title.innerText;

    this.resetForm();
    const form = document.forms["task-form"];
    // Get the task object to edit from localStorage
    const to_edit = JSON.parse(localStorage.getItem(id_edit));
    // Fetch the task details into the modal
    form.taskName.value = to_edit.name;
    form.description.value = to_edit.description;
    form.assignee.value = to_edit.assignee;
    form.date.value = to_edit.date;
    form.status.value = to_edit.status;
    //Set attribute for form as edit so when the Save button is clicked, it knows which function to call (create or update)
    form.setAttribute("data-action", "edit-action");
    form.setAttribute("id-to-update", `${id_edit}`);
  }

  // Update task to tasklist
  updateTask(id_to_update, name, description, assignee, date, status) {
    console.log(id_to_update);
    const to_update = JSON.parse(localStorage.getItem(id_to_update));
    to_update["name"] = name;
    to_update["description"] = description;
    to_update["assignee"] = assignee;
    to_update["date"] = date;
    to_update["status"] = status;
    localStorage.setItem(id_to_update, JSON.stringify(to_update));
  }

  filterTask(stt) {
    let post_json_taskByStatus = [];
    this.id_arr.forEach(function (id) {
      post_json_taskByStatus.push(JSON.parse(localStorage.getItem(id)));
    });

    // When filter status = All
    if (stt === "All") {
      // taskByStatus = post_json_taskByStatus;
      this.taskContainer.innerHTML = "";
      post_json_taskByStatus.forEach((task) => {
        const html = this.toHTML(task);
        this.renderTask(html);
      });
    }
    // When filter status = To Do, In Progress, Review, Done
    else {
      this.taskContainer.innerHTML = "";
      post_json_taskByStatus.forEach((task) => {
        if (task["status"] === stt) {
          const html = this.toHTML(task);
          this.renderTask(html);
        }
      });
    }
  }

  deleteButtonnClicked() {
    /* Because the Delete Icon doesnt exist in HTML so we have to capture the event 
    (which is created by clicking to the Delete icon) 
    on the parent container (which exists in the HTML).
    This is due to the Event Bubbling.*/
    const container_del = document.querySelector("#accordion");
    // Parent container listens to the "click" event from the children and run the function
    container_del.addEventListener("click", (event) => {
      // debugger;

      /* When the event is listened, go find (target) the closest .delete-btn. 
      The closest() method traverses the Element and its parents (heading toward the document root) 
      until it finds a node that matches the provided selector string. 
      Will return itself or the matching ancestor. If no such element exists, it returns null. */
      const del_btn = event.target.closest(".delete-btn");

      /* If there is a .delete-del_btn, wrap the attribute called "data-task-id" = id of the particular task.
      "data-task-id" = input to run deleteTask() */
      if (del_btn) {
        const id_del = del_btn.getAttribute("data-task-id");
        this.deleteTask(id_del);
      }
    });
  }

  deleteTask(id_del) {
    // console.log(id_del);
    // console.log("deleteTask func works");
    localStorage.removeItem(id_del);
    this.id_arr = this.id_arr.filter((element) => {
      // debugger;
      return element !== id_del;
    });

    localStorage.setItem("id_arr", JSON.stringify(this.id_arr));
    // console.log(this.id_arr);

    this.refreshPage();
    // this.id_arr.forEach((id) => {
    //   this.renderTask(JSON.parse(localStorage.getItem(id)));
    // });
  }
}
