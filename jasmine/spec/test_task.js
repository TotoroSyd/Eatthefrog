// import TaskManager from "../src/task_src.js";

describe("create task", () => {
  beforeEach(function () {
    taskManager = new TaskManager();
    task = new Task();
  });

  it("task obj is created", () => {
    // because Date.now() calculate to millisec. Assign it to a var will make sure id is the same
    let id = Date.now().toString();

    taskManager.id = { value: id };
    taskManager.name = { value: "task_name" };
    taskManager.description = { value: "task_description" };
    taskManager.assignee = { value: "task_assignee" };
    taskManager.date = { value: "task_date" };
    taskManager.status = { value: "done" };

    task.id = id;
    task.name = "task_name";
    task.description = "task_description";
    task.assignee = "task_assignee";
    task.date = "task_date";
    task.status = "done";

    let actual = taskManager.createTask();
    expect(actual).toEqual(task);
  });

  it(`html string contains all task details`, () => {
    // let taskManager = new TaskManager();
    let task = {
      id: 123,
      name: "task_name",
      description: "task_description",
      assignee: "task_assignee",
      date: "task_date",
      status: "done",
    };
    let html = taskManager.toHTML(task);
    expect(html).toContain(task.id);
    expect(html).toContain(task.name);
    expect(html).toContain(task.description);
    expect(html).toContain(task.assignee);
    expect(html).toContain(task.date);
    expect(html).toContain(task.status);
  });
});
