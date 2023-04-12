import AppError from "../../server/app/errors/AppError.js";

export default class User {
  #id = undefined;
  #username = undefined;
  #email = undefined;
  #password = undefined;

  constructor() {}

  #isValid() {
    if (typeof this.#id !== "string")
      throw AppError.handle("Invalid user id", 400);

    if (typeof this.#username !== "string")
      throw AppError.handle("Invalid username", 400);

    const emailIsEmpty = this.#email === null || !this.#email.trim();
    const emailIsNotValid = !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
      this.#email
    );

    if (typeof this.#email !== "string")
      throw AppError.handle("Invalid user email", 400);

    if (emailIsEmpty) throw AppError.handle("Fill user email", 400);
    if (emailIsNotValid) throw AppError.handle("Invalid user email", 400);

    const isNotExpectedPasswordValue = typeof this.#password !== "string";
    const isEmptyPassword = !String(this.#password).trim();
    const passwordHasLessThanEightCharacters =
      String(this.#password).trim().length < 8;

    if (
      isNotExpectedPasswordValue ||
      isEmptyPassword ||
      passwordHasLessThanEightCharacters
    )
      throw AppError.handle("Invalid user password", 400);
  }

  get() {
    const user = {
      id: this.#id,
      username: this.#username,
      email: this.#email,
      password: this.#password,
    };

    return user;
  }

  set({ id, username, email, password }) {
    this.#id = id;
    this.#username = username;
    this.#email = email;
    this.#password = password;

    this.#isValid();
  }
}
