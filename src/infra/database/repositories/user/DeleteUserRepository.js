export default class DeleteUserRepository {
  constructor(orm) {
    this.orm = orm;
  }

  handle(userId) {
    const users = this.orm.delete("user", userId);

    return users;
  }
}
