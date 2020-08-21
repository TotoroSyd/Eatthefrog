class TaskManager {
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
}

class Task {
  constructor(name, description, assignee, date, status) {
    this.id = Date.now().toString();
    this.name = name;
    this.description = description;
    this.assignee = assignee;
    this.date = date;
    this.status = status;
  }
}
