export default class GetWorkSpaceRepository {
  constructor(orm) {
    this.orm = orm;
  }

  handle() {
    const workSpaces = this.orm.get("workspace");

    return workSpaces;
  }
}
