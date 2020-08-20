"use strict";

export default class Task {
  constructor(name, description, assignee, date, status) {
    this.id = Date.now().toString();
    this.name = name;
    this.description = description;
    this.assignee = assignee;
    this.date = date;
    this.status = status;
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
}
