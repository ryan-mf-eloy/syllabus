export default class GetUserRepository {
  constructor(orm) {
    this.orm = orm;
  }

  handle() {
    const users = this.orm.get("user");

    return users;
  }
}
