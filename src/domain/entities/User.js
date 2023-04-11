export default class User {
  #id = undefined;
  #username = undefined;
  #email = undefined;
  #password = undefined;

  constructor() {}

  #isValid() {
    if (typeof this.#id !== "string") throw new Error("Invalid user id");

    if (typeof this.#username !== "string") throw new Error("Invalid username");

    if (typeof this.#email !== "string") throw new Error("Invalid user email");

    const isNotExpectedPasswordValue = typeof this.#password !== "string";
    const isEmptyPassword = !String(this.#password).trim();
    const passwordHasLessThanEightCharacters =
      String(this.#password).trim().length < 8;

    if (
      isNotExpectedPasswordValue ||
      isEmptyPassword ||
      passwordHasLessThanEightCharacters
    )
      throw new Error("Invalid user password");
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
