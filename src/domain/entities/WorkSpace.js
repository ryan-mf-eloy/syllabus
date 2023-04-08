export default class WorkSpace {
  #id = undefined;
  #title = "Untitled";
  #description = "Workspace description";
  #tasks = [];

  constructor() {}

  #isValid() {
    if (typeof this.#id !== "string") throw new Error("Invalid workspace id");

    if (typeof this.#title !== "string")
      throw new Error("Invalid workspace title");

    if (typeof this.#description !== "string")
      throw new Error("Invalid workspace description");

    if (!Array.isArray(this.#tasks)) throw new Error("Invalid workspace tasks");
  }

  get() {
    const task = {
      title: this.#title,
      description: this.#description,
      tasks: this.#tasks,
    };

    return task;
  }

  set({ id, title, description, tasks }) {
    this.#id = id;
    this.#title = title;
    this.#description = description;
    this.#tasks = tasks;

    this.#isValid();
  }
}
