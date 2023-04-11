export default class CreateUserRepository {
  constructor(orm) {
    this.orm = orm;
  }

  handle(userData) {
    const createdUser = this.orm.create("user", userData);
    return createdUser;
  }
}
