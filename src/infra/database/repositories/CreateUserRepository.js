export default class CreateUserRepository {
  constructor(databaseORM) {
    this.databaseORM = databaseORM;
  }

  handle(userData) {
    return this.databaseORM.create("users", userData);
  }
}
