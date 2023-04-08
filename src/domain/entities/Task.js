export default class Task {
  #id = undefined;
  #userId = undefined;
  #workSpaceId = undefined;
  #title = "Untitled";
  #description = "Task description";
  #completedAt = undefined;
  #createdAt = undefined;
  #updatedAt = undefined;

  constructor() {}

  #isValid() {
    if (typeof this.#id !== "string") throw new Error("Invalid task id");

    if (typeof this.#userId !== "string")
      throw new Error("Invalid task userId");

    if (typeof this.#workSpaceId !== "string")
      throw new Error("Invalid task workSpaceId");

    if (typeof this.#title !== "string") throw new Error("Invalid task title");

    if (typeof this.#description !== "string")
      throw new Error("Invalid task description");

    if (new Date(this.#completedAt) === "Invalid Date")
      throw new Error("Invalid task completed date");

    if (new Date(this.#createdAt) === "Invalid Date")
      throw new Error("Invalid task created date");

    if (new Date(this.#updatedAt) === "Invalid Date")
      throw new Error("Invalid task updated date");

    if (!Array.isArray(this.#tasks)) throw new Error("Invalid workspace tasks");
  }

  get() {
    const task = {
      id: this.#id,
      userId: this.#userId,
      workSpaceId: this.#workSpaceId,
      title: this.#title,
      description: this.#description,
      completedAt: this.#completedAt,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
    };

    return task;
  }

  set({
    id,
    userId,
    workSpaceId,
    title,
    description,
    completedAt,
    createdAt,
    updatedAt,
  }) {
    this.#id = id;
    this.#userId = userId;
    this.#workSpaceId = workSpaceId;
    this.#title = title;
    this.#description = description;
    this.#completedAt = completedAt;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;

    this.#isValid();
  }
}
