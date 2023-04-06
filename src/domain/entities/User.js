export default class User {
  #username = null;
  #password = null;
  #email = null;
  #role = null;

  constructor() {}

  isValid() {
    const usernameIsEmpty = this.#username === null || !this.#username.trim();
    if (usernameIsEmpty)
      return {
        message: "Please enter a username",
      };

    const roleIsEmpty = this.#role === null || !this.#role.trim();
    if (roleIsEmpty)
      return {
        message: "You must provide a role",
      };

    const emailIsEmpty = this.#email === null || !this.#email.trim();
    const emailIsNotValid = !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
      this.#email
    );
    if (emailIsEmpty || emailIsNotValid)
      return {
        message: "Please enter a valid email address",
      };

    const passwordIsEmpty = this.#role === null || !this.#role.trim();
    const passwordHasLessThanEightCharacters = this.#password.trim().length < 8;
    if (passwordIsEmpty || passwordHasLessThanEightCharacters)
      return {
        message: "Password has less than eight characters",
      };

    return true;
  }

  get() {
    const user = {
      username: this.#username,
      password: this.#password,
      email: this.#email,
      role: this.#role,
    };

    return user;
  }

  set(userData) {
    this.#username = userData.username;
    this.#password = userData.password;
    this.#email = userData.email;
    this.#role = userData.role;
  }
}
