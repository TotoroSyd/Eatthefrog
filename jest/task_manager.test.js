import {
  getByTestId,
  // Tip: all queries are also exposed on an object
  // called "queries" which you could import here as well
} from "@testing-library/dom";
// adds special assertions like toHaveTextContent
import "@testing-library/jest-dom/extend-expect";
// import "@testing-library/jest-dom";
// query utilities:
/* Reference:
 https://testing-library.com/docs/dom-testing-library/example-intro
 https://github.com/testing-library/jest-dom#tohavetextcontent 
 https://www.npmjs.com/package/jest-localstorage-mock */

import TaskManager from "../parcel/task_manager.js";
import LocalStorage from "./localStorage.js";
import Task from "../parcel/task.js";

// Add, delete, update, assign
/*  Add
        when page refreshes, task from localstorage is displayed fully on DOM
        when page refreshes, tasks from localstorage is secured ???Necessary to test?

    Update
        Edit form fields have correct details of a chosen task to edit
        Update button clicked and tasks details are updated
        Updated task overrides old task with the same id in localStorage
        Updated task overrides old task on screen
        Number of tasks on screen = number of tasks in localStorage
    Assign
        Updated assignee is displayed on screen
        Updated assignee is stored in localStorage
    Delete
        Deleted task is not on screen
        Deleted task is not in the localStorage
        Numbers of task in localStorage reduce 1
    Filter
        // Todo
*/

describe("Add task", () => {
  it("task object is created", () => {
    let taskManager = new TaskManager();
    let name = "test_name";
    let description = "test_description";
    let assignee = "test_assignee";
    let date = "test_date";
    let status = "test_status";
    let actual = taskManager.createTask(
      name,
      description,
      assignee,
      date,
      status
    );
    let exp = {
      id: Date.now().toString(),
      name: "test_name",
      description: "test_description",
      assignee: "test_assignee",
      date: "test_date",
      status: "test_status",
    };
    expect(actual).toEqual(exp);
  });

  it("a html string is generated from toHTML()", () => {
    let taskManager = new TaskManager();
    let id_test = Date.now().toString();
    let input = {
      id: id_test,
      name: "test_name",
      description: "test_description",
      assignee: "test_assignee",
      date: "test_date",
      status: "test_status",
    };
    let actual = taskManager.toHTML(input);
    let exp = {
      id: id_test,
      name: "test_name",
      description: "test_description",
      assignee: "test_assignee",
      date: "test_date",
      status: "test_status",
    };
    expect(actual).toContain(exp.id);
    expect(actual).toContain(exp.name);
    expect(actual).toContain(exp.description);
    expect(actual).toContain(exp.assignee);
    expect(actual).toContain(exp.date);
    expect(actual).toContain(exp.status);
  });
});

describe("DOM manipulation", () => {
  it("task details exist on DOM as a result of calling refreshPage() > renderTask() or renderTask() itself", () => {
    /* Jest doesnt run on the actual DOM in index.html. 
      So, I have to create a "fake" DOM element I want to test if my content is displayed*/
    const test_div = document.createElement("div");
    test_div.setAttribute("class", "card-body");
    // compulsory attribute "data-testid" to use method .toHaveTextContent from testing library
    test_div.setAttribute("data-testid", "text-content");
    // attach the new element to the DOM body
    document.body.appendChild(test_div);
    // call class TaskManager
    let taskManager = new TaskManager();
    // assign taskContainer in renderTask() with the fake test_div
    taskManager.taskContainer = test_div;
    // run the method with input (to expect to display) = "hello"
    taskManager.renderTask("hello");
    // create an actual element var to capture the return of the code to check if the "hello" is on DOM
    const element = getByTestId(document.body, "text-content");
    // set expected result for the test
    expect(element).toHaveTextContent("hello");
  });
});

describe("Localstorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  // stub test technique
  it("save to local storage", () => {
    // call TaskManager() class
    let taskManager = new TaskManager();
    // call LocalStorage() class I write in localStorage.js
    let localStorageMock = new LocalStorage();
    // create a task object to be an input
    let task = new Task("name", "description", "assignee", "date", "status");
    // initiate id_arr as an empty []. if I dont do this, test toLocalStorage() runs, it questions where/ what is id_arr
    taskManager.id_arr = [];
    // override any actions related to localStorage in taskManager with my "fake" localStrage code from localStorage.js
    taskManager.localStorage = localStorageMock;
    // call toLocalStorage() to test
    taskManager.toLocalStorage(task);
    // because in the toLocalStorage(), I JSON.stringify the input before passing it in the localstorage (setitem). So, my exp should be JSON.stringified too
    let exp = {
      id_arr: JSON.stringify([task.id]),
      [task.id]: JSON.stringify(task),
    };
    // set expected result for the test
    expect(localStorageMock.store).toEqual(exp);
  });
});

describe("Edit task", () => {
  it("Task details is updated and saved in localStorage", () => {
    // Fake a BEFORE task object in the FAKE localStorage
    let localStorageMock = new LocalStorage();
    localStorageMock.clear();
    let key = "same_id";
    // because when dealing with localStorage, I always JSON.stringify the input before passing it in the localstorage
    let value = JSON.stringify({
      name: "before_name",
      description: "before_description",
      assignee: "before_assignee",
      date: "before_date",
      status: "before_status",
    });
    localStorageMock.setItem(key, value);

    // call TaskManager() class
    let taskManager = new TaskManager();
    // prepare args for updateTask()
    let id_to_update = "same_id";
    let name = "after_name";
    let description = "after_description";
    let assignee = "after_assignee";
    let date = "after_date";
    let status = "after_status";
    // override any actions related to localStorage in taskManager with my "fake" localStrage code from localStorage.js
    taskManager.localStorage = localStorageMock;
    // call updateTask() to test
    taskManager.updateTask(
      id_to_update,
      name,
      description,
      assignee,
      date,
      status
    );

    // set expected result for the test
    // because data is saved inform of JSON.stringify
    let exp = {
      same_id: JSON.stringify({
        name: "after_name",
        description: "after_description",
        assignee: "after_assignee",
        date: "after_date",
        status: "after_status",
      }),
    };
    expect(localStorageMock.store).toEqual(exp);
  });
});

describe("Delete task", () => {
  it("removing a task deleted from the localStorage", () => {
    // Fake a BEFORE DELETE task object in the FAKE localStorage
    let localStorageMock = new LocalStorage();
    localStorageMock.clear();
    let key = "same_id";
    // because when dealing with localStorage, I always JSON.stringify the input before passing it in the localstorage
    let value = JSON.stringify({
      detail: "hello",
    });
    localStorageMock.setItem(key, value);

    // call TaskManager() class
    let taskManager = new TaskManager();
    // prepare args for deleteTask()
    let id_del = "same_id";
    // override/create a fake this.id_arr in the deleteTask()
    taskManager.id_arr = ["same_id"];
    // override any actions related to localStorage in taskManager with my "fake" localStrage code from localStorage.js
    taskManager.localStorage = localStorageMock;

    // refreshPage() is called within deleteTask() so I need to prepare a fake DOM div for Jest to work on
    const test_div = document.createElement("div");
    taskManager.taskContainer = test_div;

    // call deleteTask() to test
    taskManager.deleteTask(id_del);

    // set expected result for the test
    expect(localStorageMock.store).toEqual({ id_arr: "[]" });
  });

  it("removing a task deleted from the HTML list component group", () => {
    // refreshPage() is called inside deleteTask()
    // I tested separatedly DOM manipulation and renderTask() behaves correctly
  });
});
