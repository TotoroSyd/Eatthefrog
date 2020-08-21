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
}
