export default class DeleteUserRepository {
  constructor(orm) {
    this.orm = orm;
  }

  handle(userId) {
    return this.orm.delete("user", userId);
  }
}
