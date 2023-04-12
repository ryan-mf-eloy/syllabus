import AppError from "../../server/app/errors/AppError.js";

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
    const isEmptyId = !String(this.#id).trim();
    if (typeof this.#id !== "string" || isEmptyId)
      throw AppError.handle("Invalid task id", 400);

    const isEmptyUserId = !String(this.#userId).trim();
    if (typeof this.#userId !== "string" || isEmptyUserId)
      throw AppError.handle("Invalid task userId", 400);

    const isEmptyWorkSpaceId = !String(this.#workSpaceId).trim();
    if (typeof this.#workSpaceId !== "string" || isEmptyWorkSpaceId)
      throw AppError.handle("Invalid task workSpaceId", 400);

    if (typeof this.#title !== "string")
      throw AppError.handle("Invalid task title", 400);

    if (typeof this.#description !== "string")
      throw AppError.handle("Invalid task description", 400);

    if (new Date(this.#createdAt) === "Invalid Date")
      throw AppError.handle("Invalid task completed date", 400);

    if (new Date(this.#createdAt) === "Invalid Date")
      throw AppError.handle("Invalid task created date", 400);

    if (new Date(this.#updatedAt) === "Invalid Date")
      throw AppError.handle("Invalid task updated date", 400);
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
    this.#title = String(title).trim() ? title : "Untitled";
    this.#description = description;
    this.#completedAt = completedAt;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;

    this.#isValid();
  }
}
