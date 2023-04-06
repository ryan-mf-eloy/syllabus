export default class UpdateUserRepository {
  constructor(databaseORM) {
    this.databaseORM = databaseORM;
  }

  handle(userId, newData) {
    return this.databaseORM.update("users", userId, newData);
  }
}
