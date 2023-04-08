export default class CreateUserRepository {
  constructor(orm) {
    this.orm = orm;
  }

  handle(userData) {
    this.orm.create("user", userData);
  }
}
