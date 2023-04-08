export default class UpdateUserRepository {
  constructor(orm) {
    this.orm = orm;
  }

  handle(userData) {
    const users = this.orm.get("user", userData.id, userData);

    return users;
  }
}
