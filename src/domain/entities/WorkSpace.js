export default class WorkSpace {
  #id = undefined;
  #userId = undefined;
  #title = "Untitled";
  #description = "Workspace description";

  constructor() {}

  #isValid() {
    if (typeof this.#id !== "string") throw new Error("Invalid workspace id");

    if (typeof this.#userId !== "string")
      throw new Error("Invalid workspace userId");

    if (typeof this.#title !== "string")
      throw new Error("Invalid workspace title");

    if (typeof this.#description !== "string")
      throw new Error("Invalid workspace description");
  }

  get() {
    const task = {
      id: this.#id,
      userId: this.#userId,
      title: this.#title,
      description: this.#description,
    };

    return task;
  }

  set({ id, userId, title, description }) {
    this.#id = id;
    this.#userId = userId;
    this.#title = title;
    this.#description = description;

    this.#isValid();
  }
}
