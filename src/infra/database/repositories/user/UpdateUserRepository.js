export default class UpdateUserRepository {
  constructor(orm) {
    this.orm = orm;
  }

  handle(userId, userData) {
    const updatedUser = this.orm.update("user", userId, userData);

    return updatedUser;
  }
}
