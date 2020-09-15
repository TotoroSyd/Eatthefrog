"use strict";

import TaskManager from "./task_manager";

export default class Message {
  constructor() {
    this.taskmanager = new TaskManager();
  }
  alertMessage() {
    if (this.taskmanager.id_arr === null) {
      $("#askToCreateTask").modal("show");
    }
  }
}
