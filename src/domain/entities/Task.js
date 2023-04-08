export default class Task {
  #id = undefined;
  #title = "Untitled";
  #description = "Task description";
  #startDate = undefined;
  #dueDate = undefined;

  constructor() {}

  #isValid() {
    if (typeof this.#id !== "string") throw new Error("Invalid task id");

    if (typeof this.#title !== "string") throw new Error("Invalid task title");

    if (typeof this.#description !== "string")
      throw new Error("Invalid task description");

    if (new Date(this.#startDate) === "Invalid Date")
      throw new Error("Invalid task start date");

    if (new Date(this.#dueDate) === "Invalid Date")
      throw new Error("Invalid task due date");

    if (!Array.isArray(this.#tasks)) throw new Error("Invalid workspace tasks");
  }

  get() {
    const task = {
      title: this.#title,
      description: this.#description,
      startDate: this.#startDate,
      dueDate: this.#dueDate,
    };

    return task;
  }

  set({ id, title, description, startDate, dueDate }) {
    this.#id = id;
    this.#title = title;
    this.#description = description;
    this.#startDate = startDate;
    this.#dueDate = dueDate;

    this.#isValid();
  }
}
