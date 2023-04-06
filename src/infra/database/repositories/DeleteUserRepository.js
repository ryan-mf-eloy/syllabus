export default class DeleteUserRepository {
  constructor(databaseORM) {
    this.databaseORM = databaseORM;
  }

  handle(userId) {
    return this.databaseORM.delete("users", userId);
  }
}
