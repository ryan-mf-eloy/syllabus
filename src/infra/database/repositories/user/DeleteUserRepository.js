export default class DeleteUserRepository {
  constructor(orm) {
    this.orm = orm;
  }

  handle(userId) {
    const users = this.orm.get("user", userId);

    return users;
  }
}
