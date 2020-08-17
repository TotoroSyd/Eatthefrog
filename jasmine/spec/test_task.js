// import TaskManager from "../src/task_src.js";

describe("create task", () => {
  beforeEach(function () {
    TaskManager = new TaskManager();
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
    let html = TaskManager.toHTML(task);
    expect(html).toContain(task.id);
    expect(html).toContain(task.name);
    expect(html).toContain(task.description);
    expect(html).toContain(task.assignee);
    expect(html).toContain(task.date);
    expect(html).toContain(task.status);
  });
});
