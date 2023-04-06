export default class GetAllUSersRepository {
  constructor(databaseORM) {
    this.databaseORM = databaseORM;
  }

  handle() {
    return this.databaseORM.getAll("users");
  }
}
