"use strict";
import { format } from "date-fns";

export default class Task {
  constructor(name, description, assignee, date, status) {
    this.id = Date.now().toString();
    this.name = name;
    this.description = description;
    this.assignee = assignee;
    this.dateNum = Date.parse(date);
    this.date = format(this.dateNum, "dd-MM-yyyy");
    this.status = status;
  }
}
