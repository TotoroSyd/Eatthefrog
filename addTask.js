const taskContainer = document.querySelector("#tasks");

// create
const taskModalSaveButton = document.querySelector("#task-modal-save");
taskModalSaveButton.addEventListener("click", saveButtonClicked);

// function to save the user input into relevant variables
function saveButtonClicked() {
  //   console.log("Save Button Clicked");
  const name = document.querySelector("#taskName").value;
  const description = document.querySelector("#description").value;
  const assignee = document.querySelector("#assigned-to").value;
  const date = document.querySelector("#date").value;
  const time = document.querySelector("#time").value;
  const status = document.querySelector("#status").value;

  //   console.log({ name, description, assignee, date, time, status });
  addTask(name, description, assignee, date, time, status);
}

function addTask(name, description, assignee, date, time, status) {
  const html = `
    <hr class="mt-0">
    <div class="task-list row">
        <div class="col-2">
        <p class="text-left">${name}</p>
        </div>
        <div class="col-4">
        <p class="text-left">${description}</p>
        </div>
        <div class="col-2">
        <p class="text-center">${assignee}</p>
        </div>
        <div class="col-2">
        <p class="text-center">${date}</p>
        </div>
        <div class="col-2">
        <!-- <p class="text-center">Doing</p> -->
        <select class="text-center">
            <option ${
              status === "To Do" ? "selected" : ""
            }>To Do</option>                
            <option ${
              status === "In Progress" ? "selected" : ""
            }>In Progress</option>
            <option ${status === "Review" ? "selected" : ""}>Review</option>
            <option ${status === "Done" ? "selected" : ""}>Done</option>
        </select>
        </div>
    </div>`;
  const taskElement = document.createRange().createContextualFragment(html);
  taskContainer.append(taskElement);
}
