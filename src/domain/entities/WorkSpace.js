import AppError from "../../server/app/errors/AppError.js";

export default class WorkSpace {
  #id = undefined;
  #userId = undefined;
  #title = "Untitled";
  #description = "Workspace description";

  constructor() {}

  #isValid() {
    const isEmptyId = !String(this.#id).trim();
    if (typeof this.#id !== "string" || isEmptyId)
      throw AppError.handle("Invalid workspace id", 400);

    const isEmptyUserId = !String(this.#userId).trim();
    if (typeof this.#userId !== "string" || isEmptyUserId)
      throw AppError.handle("Invalid workspace userId", 400);

    if (typeof this.#title !== "string")
      throw AppError.handle("Invalid workspace title", 400);

    if (typeof this.#description !== "string")
      throw AppError.handle("Invalid workspace description", 400);
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
    this.#title = String(title).trim() ? title : "Untitled";
    this.#description = description;

    this.#isValid();
  }
}
