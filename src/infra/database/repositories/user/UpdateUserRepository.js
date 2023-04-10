export default class UpdateUserRepository {
  constructor(orm) {
    this.orm = orm;
  }

  handle(userData) {
    const users = this.orm.update("user", userData.id, userData);

    return users;
  }
}
