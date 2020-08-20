"use strict";

export default class FormManager {
  constructor(name, description, assignee, date, status) {
    this.name = document.forms["task-form"].taskName;
    this.description = description;
    this.assignee = assignee;
    this.date = date;
    this.status = status;
  }

  // To clear the old content in the form fields
  resetForm() {
    document.querySelector("#task-form").reset();
  }

  // To disable the Save button in the form until certain validation requirements are met
  disableBtn() {
    document.querySelector("#task-modal-save").disabled = true;
  }

  validation() {
    const name = this.name;
    const description = this.description;
    const assignee = this.assignee;
    const date = this.date;

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
}
