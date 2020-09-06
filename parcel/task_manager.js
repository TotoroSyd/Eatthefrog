"use strict";
import Task from "../parcel/task.js";
import FormManager from "./form_manager.js";
import { format } from "date-fns";

export default class TaskManager {
  constructor(name, description, assignee, date, status) {
    // define localStorage through a variable (this.localStorage) to make testing any function working with localStorage easier
    // check unit test for toLocalStorage() for example
    this.localStorage = localStorage;
    // refresh id_arr to keep track tasks that were created
    this.id_arr = JSON.parse(this.localStorage.getItem("id_arr"));
    this.task_list = this.getTasksFromLocalStorage();
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
  // Reference to date-fns https://medium.com/@k2u4yt/momentjs-vs-date-fns-6bddc7bfa21e
  today() {
    // get DOM element
    let today = document.querySelectorAll(".today");
    let nowDate = format(new Date(), "EEEE, do MMM yyyy");
    // display today date to HTML

    // Method 1: Use traditional for loop because document.querySelectorAll(".today")
    // return HTMLCollection/Nodelist ~ Array but NOT AN ARRAY
    // for (let i = 0; i < today.length; i++) {
    //   today[i].innerHTML = nowDate;
    // }

    // Method 2: convert collection to array then use forEach as usual
    Array.from(today).forEach((el) => {
      el.innerHTML = nowDate;
    });
  }

  // Get all tasks from localstorage ONCE when page loads and store in a huge object,
  // to reduce spending effort to come into localstorage many times
  getTasksFromLocalStorage() {
    const task_list_dummy = {};
    if (this.id_arr === null) {
      return task_list_dummy;
    } else {
      this.id_arr.forEach((task_id) => {
        task_list_dummy[task_id] = JSON.parse(
          this.localStorage.getItem(task_id)
        );
      });
      return task_list_dummy;
    }
  }

  hideWelcomeBanner() {
    document.querySelector(".banner").style.display = "none";
    document.querySelector(".hidden_banner_button").style.display = "block";
    document.querySelector(".task_container").style.display = "flex";
    document.querySelector("footer").style.display = "flex";
  }

  hideContent() {
    document.querySelector(".banner").style.display = "flex";
    document.querySelector(".hidden_banner_button").style.display = "none";
    document.querySelector(".task_container").style.display = "none";
    document.querySelector("footer").style.display = "none";
  }

  refreshPage() {
    // clear everything on the page before loading content
    this.taskContainer.innerHTML = "";
    // update today date
    this.today();
    // in case id_arr in the local storage is empty, set it as an empty array.
    // Otherwise, id_arr becomes null => break the program
    if (this.id_arr === null) {
      this.id_arr = [];
      return;
    } else {
      // run through the id_arr's element = key to look for task in local storage. For each id element, go to localStorage and getItem and parse it.
      this.id_arr.forEach((id) => {
        // let postJsonTask = JSON.parse(this.localStorage.getItem(id));
        let postJsonTask = this.task_list[id];
        let html = this.toHTML(postJsonTask);
        this.renderTask(html);
      });
    }
  }

  createTask(name, description, assignee, date, status) {
    // const name = this.name;
    // const description = this.description;
    // const assignee = this.assignee;
    // const date = this.date;
    // const status = this.status;
    const task = new Task(name, description, assignee, date, status);
    // return a task object which will be an input for toHTML(), renderTask()
    return task;
  }

  toHTML(task) {
    // 'https://www.designcise.com/web/tutorial/how-to-append-an-html-string-to-an-existing-dom-element-using-javascript'
    // 'https://grrr.tech/posts/create-dom-node-from-html-string/'
    // console.log(task);
    if (task === undefined) {
      return;
    } else {
      const html = `
    <div id='${task["id"]}' class="task-list row">
      <p class="col-2 text-left">${task["name"]}</p>
      <p class="col-3 text-left">${task["description"]}</p>
      <p class=" col-2 text-center">${task["assignee"]}</p>
      <p class="text-center col-2">${task["date"]}</p>
      <p class="col-2 text-center">${task["status"]}</p>
      <a href="#" data-toggle="tooltip" title="Edit" class="edit-btn" data-task-id='${task["id"]}'><img src="image/pencil-edit-button.svg" alt="pencil-edit-button" width="15" height="15"/></a>
      <a href="#deleteConfirmationModal" data-toggle="tooltip modal" title="Delete" class="delete-btn" data-task-id='${task["id"]}'><img src="image/trash.svg" alt="delete-button" width="15" height="15"/></a>
    </div>`;
      //data-target="#deleteConfirmationModal" is for button and other elements (<p>)
      return html;
    }
  }
  renderTask(html) {
    if (html === undefined) {
      return;
    } else {
      const taskElement = document.createRange().createContextualFragment(html);
      //  const edit = taskElement.querySelector(".edit");
      //  edit.addEventListener("click", editTask);
      // this.taskContainer.appendChild(taskElement);
      this.taskContainer.prepend(taskElement);
      // taskContainer.insertAdjacentHTML("beforeend", html);
    }
  }

  toLocalStorage(task) {
    // Push new id to id_arr
    this.id_arr.push(task["id"]);
    // serialize the id_arr into string format to save in localstorage
    let json_id_arr = JSON.stringify(this.id_arr);
    // serialize the taskObj into string format to save in localstorage
    let json_task = JSON.stringify(task);
    // save to the local storage the id_arr containing all task id
    this.localStorage.setItem("id_arr", json_id_arr);
    // save to the local storage the task object
    this.localStorage.setItem(task["id"], json_task);
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
    // Open and change Modal title to Edit
    $("#taskModal").modal("show");
    modal_title.innerText = "Edit Task";
    // modal_title.value = modal_title.innerText;
    const formManager = new FormManager();
    formManager.resetForm();
    const form = document.forms["task-form"];
    // Get the task object to edit from this.task_list
    // const to_edit = JSON.parse(this.localStorage.getItem(id_edit));
    const to_edit = this.task_list[id_edit];
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
    // const to_update = JSON.parse(this.localStorage.getItem(id_to_update));
    const to_update = this.task_list[id_to_update];
    to_update["name"] = name;
    to_update["description"] = description;
    to_update["assignee"] = assignee;
    to_update["date"] = date;
    to_update["status"] = status;
    this.localStorage.setItem(id_to_update, JSON.stringify(to_update));
  }

  filterTask(stt) {
    // When filter status = All
    if (stt === "All") {
      // taskByStatus = post_json_taskByStatus;
      this.taskContainer.innerHTML = "";
      this.id_arr.forEach((id) => {
        const html = this.toHTML(this.task_list[id]);
        this.renderTask(html);
      });
    }
    // When filter status = To Do, In Progress, Review, Done
    else {
      this.taskContainer.innerHTML = "";
      this.id_arr.forEach((id) => {
        const taskObjFromTaskList = this.task_list[id];
        if (taskObjFromTaskList["status"] === stt) {
          const html = this.toHTML(taskObjFromTaskList);
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

      // If there is a .delete-del_btn
      // Open Delete Confirmation Modal
      if (del_btn) {
        //When the delete icon clicked, open the modal. instruction from Bootstap Doc
        $("#deleteConfirmationModal").modal("show");
        // wrap the attribute called "data-task-id" = id of the particular task,
        const id_del = del_btn.getAttribute("data-task-id");
        //and setAttribute to the #confirm-to-delete-btn in Delete Confirmation Modal
        const confirm_to_delete_btn = document.querySelector(
          "#confirm-to-delete-btn"
        );
        confirm_to_delete_btn.setAttribute("data-task-id", `${id_del}`);
      }
    });
  }

  confirmToDeleteButtonClicked() {
    $("#deleteConfirmationModal").modal("hide");
    const confirm_to_delete_btn = document.querySelector(
      "#confirm-to-delete-btn"
    );
    // get value of the attribute "data-task-id"
    const id_del = confirm_to_delete_btn.getAttribute("data-task-id");
    // return id_del which is an input to run deleteTask()
    return id_del;
  }

  deleteTask(id_del) {
    // console.log(id_del);
    // console.log("deleteTask func works");
    this.localStorage.removeItem(id_del);
    this.id_arr = this.id_arr.filter((element) => {
      // debugger;
      return element !== id_del;
    });

    this.localStorage.setItem("id_arr", JSON.stringify(this.id_arr));
    // console.log(this.id_arr);

    this.refreshPage();
    // this.id_arr.forEach((id) => {
    //   this.renderTask(JSON.parse(this.localStorage.getItem(id)));
    // });
  }

  countTaskByStatus(stt) {
    let count = 0;
    if (stt === "All" && this.id_arr !== null) {
      count = this.id_arr.length;
    } else if (this.id_arr !== null) {
      this.id_arr.forEach((id) => {
        let task = this.task_list[id];
        if (task["status"] === stt) {
          count++;
        }
      });
    }
    return count;
  }

  countTaskByDueDate() {
    //todo
  }

  updateCountTaskDisplay(element, task_count) {
    element.innerHTML = task_count;
  }
}
